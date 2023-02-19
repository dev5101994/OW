import React from "react";
import { Button, Card } from "react-bootstrap";
import Slider from "react-slick";
import Silverfrog from "../Assets/images/silverfrog.png";
import "../Assets/Css/communitydetailpage.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { img_URL } from "../utils/serverUrl";

const SlickSlide = (props) => {
  const communityact = props.communityact;
  // console.log(communityact, "valuetttttt");
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

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
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
      <Slider {...settings}>
        {communityact.map((item, index) => (
          <Card
            className="slidercard_card"
            key={index}
            onClick={() => props.onClick(item.id)}
          >
            <Card.Img
              variant="top"
              className="slider_card_img"
              src={`${img_URL}${item.image}`}
            />
            <Card.Body>
              <Card.Title className="slider_card_title">
                {/* Silverfrog195 */}
                {item.act_name}
              </Card.Title>
              <Card.Text className="slider_card_text">
                {item.description}
                {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad, */}
              </Card.Text>
              <Button variant="primary" className="slick_slide_btn">
                {item.count_act} Chapters
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Slider>
    </>
  );
};

export default SlickSlide;
