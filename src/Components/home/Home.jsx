import { React, useState } from "react";
import Headers from "../Layouts/Headers";
import "../../Assets/Css/dashboard.css";
import { Button, Container } from "react-bootstrap";
import CategoryCards from "../CategoryCards";
import Layer2 from "../../Assets/images/Layer 2.png";
import Images from "../../Assets/images/Images.png";

import ContentCards from "../contentCards";
import { addButton } from "../../utils/svg.file";
import Avatar from "../../Assets/images/avatar.png";
import Image6 from "../../Assets/images/image 6.png";
import Image7 from "../../Assets/images/image 7.png";
import Image8 from "../../Assets/images/image-8.png";
import Image9 from "../../Assets/images/image 9.png";
import Footer from "../Layouts/Footer";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const contents = [
    {
      title: "Featured Communities",
      classnew: "bg1",
      cards: [
        {
          image: Avatar,
          icon: addButton,
          title: "Community 1",
          description: "Loreum epsum sit dolor ",
          id: "1",
        },
        {
          image: Image6,
          icon: addButton,
          title: "Community 3",
          description: "Loreum epsum sit dolor ",
          id: "2",
        },
        {
          image: Image7,
          title: "Community 2",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "3",
        },
        {
          image: Image8,
          title: "Community 2",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "3",
        },
        {
          image: Image9,
          title: "Community 2",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "3",
        },
      ],
    },

    {
      title: "Top Communities",
      classnew: "bg2",
      cards: [
        {
          image: Avatar,
          title: "Community 1",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "1",
        },
        {
          image: Image6,
          title: "Community 3",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "2",
        },
        {
          image: Image7,
          title: "Community 1",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "1",
        },
        {
          image: Image8,
          title: "Community 3",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "2",
        },
        {
          image: Image9,
          title: "Community 2",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "3",
        },
      ],
    },

    {
      title: "Newest Communities",
      classnew: "bg3",
      cards: [
        {
          image: Avatar,
          title: "Community 1",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "1",
        },
        {
          image: Image6,
          title: "Community 1",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "1",
        },
        {
          image: Image7,
          title: "Community 3",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "2",
        },
        {
          image: Image8,
          title: "Community 3",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "2",
        },
        {
          image: Image9,
          title: "Community 2",
          icon: addButton,
          description: "Loreum epsum sit dolor ",
          id: "3",
        },
      ],
    },
  ];
  let gname = localStorage.getItem("userToken");
  let navigate = useNavigate();
  const showcommunity = () => {
    localStorage.removeItem("community_id");
    navigate("/create-communities");
  };

  return (
    <>
      <Headers />

      <section>
        <Container>
          <div className="home_home_img">
            <h1 className="home_heading">
              Create your <br /> own content
            </h1>
            <p className="home_para_first">
              OverWrite is a site for content creators. When <br /> we say
              content creators, we are talking about <br /> people who make
              videos, Write books, articles, <br /> and so on.
            </p>
            <p className="home_para_first">
              Instead of individual content creators pushing <br /> out their
              own content, they collectively work on <br /> something they all
              have a niche in.
            </p>
            {gname ? (
              <div className="home_create_now_buttom" onClick={showcommunity}>
                <Link to="" className="home_create_button">
                  Create Now
                </Link>
              </div>
            ) : (
              <div className="home_create_now_buttom">
                <Link to="/signin" className="home_create_button">
                  Create Now
                </Link>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="home_category_card">
        <Container>
          <CategoryCards />
        </Container>
      </section>
      {/* //////////////////////////////////////////////////////////////////////////////////////// */}
      <section>
        <Container>
          <div>
            <a href="#!">
              <img src={Layer2} className="w-100 mb-4" alt="" />
            </a>
          </div>
        </Container>
      </section>

      {/* //////////////////////////////////////////////////////////////////////////////////////// */}
      <section>
        <div className="home_community_background ">
          <Container>
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <div>
                  <h1 className="home_community_heading">Communities</h1>
                  <p className="home_community_text">
                    Communities on OverWrite are homes for content creators who
                    all <br /> share a similar niche. The original creator and
                    founders of a community <br /> are responsible for verifying
                    and inviting new members. Only members <br /> can contribute
                    to the content inside of their community, non- members
                    <br /> can still view and request an invitation. All
                    proposals made inside of a <br /> community are reviewed by
                    its members before they become official <br />{" "}
                    contributions.
                  </p>
                  <div className="pb-3 pt-2">
                    <Button className="home_community_button">View All</Button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="text-end">
                  <img src={Images} className="home_community_images" alt="" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section className="newestsection">
        {contents.map((content, index) => {
          return (
            <div
              key={index}
              className={`newestcommunitiescardsImage ${content.classnew}`}
            >
              <Container>
                <ContentCards {...content} />
              </Container>
            </div>
          );
        })}
      </section>
      <section>
        <div>
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Home;
