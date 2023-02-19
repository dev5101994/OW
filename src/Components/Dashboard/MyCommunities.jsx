import React, { useEffect } from "react";
import "../../Assets/Css/mycommunities.css";
import Header from "../Chat/Header";
import Image6 from "../../Assets/images/image 6.png";
import { Card, Container } from "react-bootstrap";
import Avatar from "../../Assets/images/avatar.png";
import Image7 from "../../Assets/images/image 7.png";
import Image9 from "../../Assets/images/image 9.png";
import { addSign } from "../../utils/svg.file";
import MyCommunitiesFollow from "./myCommunitiesFollow";
import { MdAddCircleOutline } from "react-icons/md";
import Headers from "../Layouts/Headers";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_URL, COMMUNITYSMALLIMG_URL } from "../../utils/serverUrl";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid } from "@mui/material";

const MyCommunities = () => {
  const [myCommunities, setMyCommunities] = React.useState([]);
  const [followcommunity, setFollowcommunity] = React.useState([]);
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");

  let navigate = useNavigate();
  const showcommunity = () => {
    localStorage.removeItem("community_id");
    navigate("/create-communities");
  };
  const showcommunites = () => {
    // var data = new FormData();
    // data.append('id', '6');

    var config = {
      method: "get",
      url: `${Base_URL}showcommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      // data : data
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "muy community");
        setMyCommunities(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const follwedcommunity = () => {
    var config = {
      method: "get",
      url: `${Base_URL}followedcommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "followed user datas");
        setFollowcommunity(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showcommunites();
    follwedcommunity();
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`custom-arrow ${className}`} onClick={onClick}>
        <button>
          <ArrowBackIcon />
        </button>
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`custom-arrow ${className}`} onClick={onClick}>
        <button>
          <ArrowForwardIcon />
        </button>
      </div>
    );
  };

  var settingsFirst = {
    dots: false,

    infinite: true,
    autoplay: false,
    speed: 500,
    draggable: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var settings = {
    dots: false,

    infinite: true,
    autoplay: false,
    speed: 500,
    draggable: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Headers />
      <div className="mycommunity h-100">
        <Container>
          <div className="pt-4">
            <div className="mycommunity_heading_div mt-4 me-1 ms-3">
              <h1 className="mycommunity_heading">
                My Communities - Created by me
              </h1>
            </div>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              className="mt-5"
            >
              <Grid item lg={9} xs={12}>
                <div className="commity-slider slicksslider">
                  <Slider {...settings}>
                    {myCommunities.map((item) => (
                      <>
                        <div className="col mb-4">
                          <Link
                            to={`/community-details/${item.id}`}
                            className="color-none"
                          >
                            <Card className="mycommunity_card_card">
                              <Card.Img
                                variant="top"
                                src={`${COMMUNITYSMALLIMG_URL}${item.image}`}
                                className="mycommunity_card_img"
                              />
                              <Card.Body>
                                <Card.Title className="mycommunity_card_title">
                                  {item.title}
                                </Card.Title>
                                <Card.Text className="mycommunity_card_text">
                                  {item.about}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Link>
                        </div>
                      </>
                    ))}
                  </Slider>
                </div>
              </Grid>
              <div className="col-lg-3 ps-3 mb-3">
                <Card className="mycommunity_add_new_card">
                  <Card.Body className="mycommunity_card_body_add_new">
                    <p className="mycommunity_card_add_icon">{addSign}</p>
                    <Card.Title
                      className="mycommunity_card_add_new_title"
                      onClick={showcommunity}
                    >
                      Add New <br /> Community
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Grid>
          </div>

          <div className="">
            <div className="mycommunity_heading_div mb-5 mt-4 me-1 ms-3">
              <h1 className="mycommunity_heading">
                My Communities - Followed by me
              </h1>
            </div>
            {/* <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 py-4"> */}
            <Grid item lg={9} xs={12}>
              <div className="commity-slider slicksslider">
                <Slider {...settingsFirst}>
                  {myCommunities.map((item) => (
                    <>
                      <div className="col mb-4">
                        <Link
                          to={`/community-details/${item.id}`}
                          className="color-none"
                        >
                          <Card className="mycommunity_card_card">
                            <Card.Img
                              variant="top"
                              src={`${COMMUNITYSMALLIMG_URL}${item.image}`}
                              className="mycommunity_card_img"
                            />
                            <Card.Body>
                              <Card.Title className="mycommunity_card_title">
                                {item.title}
                              </Card.Title>
                              <Card.Text className="mycommunity_card_text">
                                @{item.handle}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </div>
                    </>
                  ))}
                </Slider>
              </div>
              {/* <div className="commity-slider">
                <Slider {...settingsFirst}>
                  {followcommunity.map((item) => (
                    <>
                      <div className="col pb-3">
                      <Link
                            to={`/community-details/${item.id}`}
                            className="color-none"
                          >
                        <Card className="mycommunity_card_card">
                          <Card.Img
                            variant="top"
                            src={`${COMMUNITYSMALLIMG_URL}${item.image}`}
                            className="mycommunity_card_img"
                          />
                          <Card.Body>
                            <Card.Title className="mycommunity_card_title">
                             {item.title}
                            </Card.Title>
                            <Card.Text className="mycommunity_card_text">
                              @{item.handle}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        </Link>
                      </div>
                    </>
                  ))}
                </Slider>
              </div> */}
            </Grid>
            {/* </div> */}
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyCommunities;
