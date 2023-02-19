import React, { useEffect } from "react";
import Headers from "../Layouts/Headers";
import { Button, Card } from "react-bootstrap";
import { VscEdit } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Placeholder from "../../Assets/images/placeholder.png";
import Facebook from "../../Assets/images/facebook1.svg";
import Twiter from "../../Assets/images/twitter1.svg";
import Image6 from "../../Assets/images/image 6.png";
import Image7 from "../../Assets/images/image 7.png";
import Image8 from "../../Assets/images/image-8.png";
import Image9 from "../../Assets/images/image 9.png";
import Avatar from "../../Assets/images/avatar.png";
import Instagram from "../../Assets/images/instagram1.svg";
import Linkedin from "../../Assets/images/linkedin3.svg";
import Linkedin3 from "../../Assets/images/linkedin2.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid } from "@mui/material";
import "../Chat/Chat.css";
import axios from "axios";
import {
  Base_URL,
  CHAPTERIMG_URL,
  COMMUNITYSMALLIMG_URL,
  PROFILEIMG_URL,
} from "../../utils/serverUrl";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import moment from "moment";

const Profile = () => {
  const [profiledata, setProfiledata] = React.useState([]);
  const [communitydata, setCommunitydata] = React.useState([]);
  const [communitychapter, setCommunitychapter] = React.useState([]);
  const [communityevent, setCommunityevent] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");
  const showprofile = () => {
    var config = {
      method: "post",
      url: `${Base_URL}user-details`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        setLoading(true);
        console.log(response.data.success, "view");
        setProfiledata(response.data.success);
        setCommunitychapter(response.data.chapter);
        setCommunitydata(response.data.community);
        setCommunityevent(response.data.event);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    showprofile();
  }, []);
  // const community = communitydata.length;
  // console.log(community, "total comunity");
  const date = moment(profiledata.created_at).format(" Do MMMM YYYY ");
  console.log(date);
  return (
    <div className="editprofile_backmain">
      <div>
        <Headers />
      </div>
      {loading ? (
        <div className="container">
          <div className="profile_edit_main">
            <div className="profile_name_box">
              <div className="profileedit_nameemail">
                <div className="editprofile_name">{profiledata.name} </div>
                <div className="editprofile_email">
                  @{profiledata.user_name}
                </div>
              </div>
              <div className="profileedit_rightside">
                <div className="profileedit_rightside_online">
                  <div className="profileedit_rightside_show">
                    <span className="online_dot"></span>Online
                  </div>
                  <div className="profileedit_rightside_date">
                    Joined on {date}
                  </div>
                </div>
                <div className="pe-4">
                  <Link to={`/editprofile/${profiledata.id}`}>
                    <Button className="editprofile_button">
                      <span className="pe-2">
                        <VscEdit className="editprofile_VscEdit" />
                      </span>
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="editprofile_imgbox">
            <img
              src={
                profiledata.image
                  ? `${PROFILEIMG_URL}${profiledata.image}`
                  : Profile
              }
              // {Placeholder}
              alt="profile"
              className="editprofile_img"
            />
          </div>
          <div className="editprofile_bio">
            <p className="editprofile_bio_bio">Bio</p>
            <p className="editprofile_bio_dis">{profiledata.bio}</p>
          </div>
          <div className="col-12 editprofile_link_icon">
            <div className="editprofile_libk_text">My Links : </div>
            <Link to={`/${profiledata.facebook}`}>
              <div>
                <img
                  src={Facebook}
                  alt="link"
                  className="editprofile_libk_img"
                />
              </div>
            </Link>
            <Link to={`/${profiledata.twitter}`}>
              <div>
                <img src={Twiter} alt="link" className="editprofile_libk_img" />
              </div>
            </Link>
            <Link to={`/${profiledata.instagram}`}>
              <div>
                <img
                  src={Instagram}
                  alt="link"
                  className="editprofile_libk_img"
                />
              </div>
            </Link>
            <Link to={`/${profiledata.linkedin}`}>
              <div>
                <img
                  src={Linkedin}
                  alt="link"
                  className="editprofile_libk_img"
                />
              </div>
            </Link>
            <Link to={`/${profiledata.tiktok}`}>
              <div>
                <img
                  src={Linkedin3}
                  alt="link"
                  className="editprofile_libk_img"
                />
              </div>
            </Link>
          </div>
          <div className="editprofile_cards_loop">
            <div className="editprofile_cards_community">My Communities</div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
              {communitydata?.map((item) => (
                <div className="col editprofile_categories_cards_col_div">
                  <Card className="categories_card" key={item.id}>
                    <Card.Img
                      variant="top"
                      className="newest_categories_card_images"
                      src={`${COMMUNITYSMALLIMG_URL}${item.image}`}
                    />
                    <Card.Body>
                      <div className="community_cards_body">
                        <Card.Title className="editprofile_newest_card_title">
                          {item.title}
                        </Card.Title>
                        <Card.Text className="profileedit_newest_card_text">
                          {item.community_handle}
                        </Card.Text>
                        <Card.Text className="profileedit_newest_card_dis">
                          {item.about}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="editprofile_cards_loop">
            <div className="editprofile_cards_community">My Chapters</div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5">
              {communitychapter?.map((item) => (
                <div className="col editprofile_categories_cards_col_div">
                  <Card className="categories_card" key={item.id}>
                    <Card.Img
                      variant="top"
                      className="newest_categories_card_images"
                      src={`${CHAPTERIMG_URL}${item.images}`}
                    />
                    <Card.Body>
                      <div className="community_cards_body">
                        <Card.Title className="editprofile_newest_card_title">
                          {item.chapter_name}
                        </Card.Title>
                        <Card.Text className="profileedit_newest_card_text">
                          {item.description}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="editprofile_cards_loop">
            <div className="editprofile_cards_community">My Events</div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5">
              {communityevent?.map((item) => (
                <div className="col editprofile_categories_cards_col_div">
                  <Card className="categories_card" key={item.id}>
                    <Card.Img
                      variant="top"
                      className="newest_categories_card_images"
                      src={item.image}
                    />
                    <Card.Body>
                      <div className="community_cards_body">
                        <Card.Title className=" editprofile_newest_card_title">
                          {item.event_name}
                        </Card.Title>
                        <Card.Text className="profileedit_newest_card_text">
                          {item.description}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Profile;
