import React, { useEffect } from "react";
import Header from "../Chat/Header";
import { Container } from "react-bootstrap";
import "../../Assets/Css/dashboard.css";
import Image6 from "../../Assets/images/image 6.png";
import Image9 from "../../Assets/images/image 9.png";
import Avatar from "../../Assets/images/avatar.png";
import Layer2 from "../../Assets/images/Layer 2.png";
import Rightarrow from "../../Assets/images/rightarrow.png";
import Footer from "../Layouts/Footer";
import Headers from "../Layouts/Headers";
import { Base_URL, COMMUNITYSMALLIMG_URL } from "../../utils/serverUrl";
import axios from "axios";
// import  from "react";

const Index = () => {
  const [communitydata, setCommunitydata] = React.useState([]);
  const [communitychapter, setCommunitychapter] = React.useState([]);
  const [communityevent, setCommunityevent] = React.useState([]);
  const [communityacts, setCommunityacts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allcomunity, setAllcomunity] = React.useState([]);
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
        console.log(response, "responce data");

        setCommunitychapter(response.data.chapter);
        setCommunitydata(response.data.community);
        setCommunityevent(response.data.event);
        setCommunityacts(response.data.act);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    showprofile();
  }, []);
  const totalCum = communitydata?.length;
  const totalact = communityacts?.length;
  const totalchap = communitychapter?.length;
  const totalevent = communityevent?.length;
  console.log(totalact, "total");

  const showCommunity = () => {
    let data = new FormData();

    let config = {
      method: "get",
      url: `${Base_URL}allcommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response?.data.data, "show communityin dashboard page");
        setAllcomunity(response?.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showCommunity();
  }, []);

  const dashcard = [
    {
      community: "Communities",
      created: "Created",
      num: totalCum,
    },
    {
      community: "Acts",
      created: "Created",
      num: totalact,
    },
    {
      community: "Chapters",
      created: "Created",
      num: totalchap,
    },
    {
      community: "Events",
      created: "Created",
      num: totalevent,
    },
  ];
  const dashcard2 = [
    {
      image: Image6,
      discription: "A new Chapter (Chapter Name) added in the community",
      name: " Bikers of Californiya.",
      posttime: "2 hours ago",
    },
    {
      image: Image9,
      discription: "A new event (Event name) added in ",
      name: "Bikers.",
      posttime: "6 hours ago",
    },
    {
      image: Avatar,
      discription: "A new event (Event name) added in ",
      name: "Bikers.",
      posttime: "5 hours ago",
    },
  ];
  const dashcard3 = [
    {
      image: Image6,
      discription: "Community 1",
      name: " Loreum epsum sit dolor ",
    },
    {
      image: Image9,
      discription: "Community 1 ",
      name: "Loreum epsum sit dolor",
    },
    {
      image: Avatar,
      discription: "Community 1",
      name: "Loreum epsum sit dolor",
    },
    {
      image: Avatar,
      discription: "Community 1",
      name: "Loreum epsum sit dolor",
    },
  ];

  return (
    <>
      <div className="main_dashboard">
        <div>
          <Headers />
        </div>

        <div className="container dashboard_home">
          <div className="dashboard_tital">
            <span className="title_text">Dashboard</span>
          </div>
          <div className="row">
            {dashcard.map((item) => (
              <div className="col-lg-3 col-md-6 col-12">
                <>
                  <div className="dashboard_card">
                    <div className="dashboard_card_inside">
                      <p>{item.community}</p>
                      <p>{item.created}</p>
                    </div>

                    <div className="dashboard_card_inside_number">
                      <p className="dashboard_card_number">{item.num}</p>
                    </div>
                  </div>
                </>
              </div>
            ))}
          </div>
          <div className="row dashboard_wnew">
            <div className="col-lg-7 col-md-6 col-12 ">
              <div className="dachboard_whatsnew"> What’s new</div>
              <div className="dashboard_event">
                {dashcard2.map((items) => (
                  <div className="dashboard_event_card">
                    <div>
                      <img
                        src={items.image}
                        alt="img"
                        className="dashboard_card_img"
                      />
                    </div>
                    <div className="dashboard_abc">
                      <p className="dashboard_card_disp">
                        {items.discription}
                        <span>{items.name}</span>
                      </p>
                    </div>
                    <div className="dashboard_card_time">
                      <p className="dashboard_card_p">{items.posttime}</p>
                    </div>
                  </div>
                ))}
                <div className="dashboard_card_load">
                  Load more
                  <img src={Rightarrow} alt="arrow" />
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-12">
              <div className="dachboard_whatsnew">Latest Communities </div>
              <div className="dashboard_event">
                {allcomunity.map((itemes) => (
                  <div className="dashboard_card_community">
                    <img
                      src={
                        itemes.image
                          ? `${COMMUNITYSMALLIMG_URL}${itemes.image}`
                          : Avatar
                      }
                      // src={itemes.image}
                      alt=""
                      className="dashboard_card_img"
                    />
                    <div className="dashboard_card_community_text">
                      <p className="dashboard_card_community_text_p">
                        {itemes.title}
                      </p>
                      <p className="dashboard_card_community_text_p2">
                        {itemes.about === "null"
                          ? "hello every one"
                          : itemes.about}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="dashboard_layer_backimg">
            {/* <Container> */}
            <div className=" container dashboard_layer">
              <a href="#">
                <img src={Layer2} className="w-100 mb-4" />
              </a>
            </div>
            {/* </Container> */}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
