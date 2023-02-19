import React, { useState } from "react";
import "../Assets/Css/dashboard.css";
import { Button, Card } from "react-bootstrap";
import {
  book,
  business,
  education,
  legislation,
  noteBook,
  video,
} from "../utils/svg.file";
import { Base_URL } from "../utils/serverUrl";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CategoryCards = () => {
  let navigate = useNavigate();
  const [cardArray, setcardArray] = useState([]);

  const fetchData = async () => {
    var config = {
      method: "get",
      url: `${Base_URL}allcategory`,
    };

    axios(config)
      .then(function(response) {
        setcardArray(response?.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const SamplePrevArrow = (props) => {
  //   const { className, onClick } = props;
  //   return (
  //     <div className={`custom-arrow ${className}`} onClick={onClick}>
  //       <button>
  //         <ArrowBackIcon />
  //       </button>
  //     </div>
  //   );
  // };
  // const SampleNextArrow = (props) => {
  //   const { className, onClick } = props;
  //   return (
  //     <div className={`custom-arrow ${className}`} onClick={onClick}>
  //       <button>
  //         <ArrowForwardIcon />
  //       </button>
  //     </div>
  //   );
  // };

  // var settings = {
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  console.log({ cardArray });
  return (
    <>
      <h1 className="categorycard_heading">Find Your Niche</h1>

      <div className="commity-slider">
        <div className="row">
          {cardArray?.map((item, index) => {
            if (index > 5) {
              return;
            }
            // console.log({ hello: item.id });
            return (
              <div className="col-md-4">
                <Card
                  className="categorycard_card"
                  onClick={() => navigate(`/search/${item?.id}`)}
                >
                  <Card.Body>
                    <span className="categorycard_icon">{noteBook}</span>
                    <Card.Title className="categorycard_title">
                      <span>{item?.name}</span>
                    </Card.Title>
                    <Card.Text className="categorycard_text">
                      {item?.discription}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <Button
          className="categorycard_button"
          onClick={() => navigate("/search/1")}
        >
          View All
        </Button>
      </div>

      {/* <SearchPage show={show} onHide={() => setShow(false)} /> */}
    </>
  );
};

export default CategoryCards;
