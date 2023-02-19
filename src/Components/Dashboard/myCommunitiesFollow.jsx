import React from "react";
import "../../Assets/Css/mycommunities.css";
import Header from "../Chat/Header";
import Image6 from "../../Assets/images/image 6.png";
import { Card, Container } from "react-bootstrap";
import Avatar from "../../Assets/images/avatar.png";
import Image7 from "../../Assets/images/image 7.png";
import Image9 from "../../Assets/images/image 9.png";
import { addSign } from "../../utils/svg.file";

const MyCommunitiesFollow = () => {
  const myCommunities = [
    {
      image: Avatar,
      title: "Community 1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      image: Image6,
      title: "Community 1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      image: Image7,
      title: "Community 3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
    {
      image: Image9,
      title: "Community 15",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna ",
    },
  ];
  return (
    <>
      <Header />
      <div className="mycommunity">
        <Container>
          <div className="pt-4">
            <div className="mycommunity_heading_div">
              <h1 className="mycommunity_heading">
                My Communities - Created by me
              </h1>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5">
              {myCommunities.map((item) => (
                <>
                  <div className="col">
                    <Card className="mycommunity_card_card">
                      <Card.Img
                        variant="top"
                        src={item.image}
                        className="mycommunity_card_img"
                      />
                      <Card.Body>
                        <Card.Title className="mycommunity_card_title">
                          {item.title}
                        </Card.Title>
                        <Card.Text className="mycommunity_card_text">
                          {item.text}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              ))}
              <div className="col">
                <Card className="mycommunity_add_new_card">
                  <Card.Body className="mycommunity_card_body_add_new">
                    <p className="mycommunity_card_add_icon">{addSign}</p>
                    <Card.Title className="mycommunity_card_add_new_title">
                      Add New <br /> Community
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default MyCommunitiesFollow;
