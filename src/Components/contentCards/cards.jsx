import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Base_URL, COMMUNITYSMALLIMG_URL } from "../../utils/serverUrl";
import Image6 from "../../Assets/images/image 6.png";
import { addButton } from "../../utils/svg.file";
import axios from "axios";
import { useEffect } from "react";

function Cards({ cards }) {
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  let userId = localStorage.getItem("userId");
  const [joinstatus, setJoinstatus] = React.useState([]);
  // console.log("cards ---- ", cards);

  const joined = (id, user_id) => {
    var data = new FormData();
    data.append("community_id", id);
    data.append("user_id", user_id);
    data.append("state", "join");

    var config = {
      method: "post",
      url: `${Base_URL}joinuser`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setJoinstatus([...joinstatus, id]);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const showrequest = () => {
    var config = {
      method: "post",
      url: `${Base_URL}showrequest`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "id");
        const comunity_id = response.data.data;
        const doubled = comunity_id.map(
          (comunity_id) => comunity_id.community_id
        );

        setJoinstatus(doubled);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showrequest();
  }, []);

  const handleRemove = (id) => {
    const newPeople = joinstatus.filter((joinstatus) => joinstatus !== id);
    setJoinstatus(newPeople);
    var data = new FormData();
    data.append("id", id);

    var config = {
      method: "post",
      url: `${Base_URL}deleterequest`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {})
      .catch(function(error) {
        console.log(error);
      });
  };

  // useEffect(() => {

  // }, []);

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
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  //   centerMode: true,
  // };

  return (
    <div className="row">
      {cards?.map((item) => (
        <>
          <div className="col-md-3">
            <div className="categories_cards_col_div">
              <Card className="categories_card" key={item.id}>
                <Link to={`/community-details/${item.id}`}>
                  <Card.Img
                    variant="top"
                    className="newest_categories_card_images"
                    src={
                      item.image
                        ? `${COMMUNITYSMALLIMG_URL}${item.image}`
                        : Image6
                    }
                    // {`${COMMUNITYSMALLIMG_URL}${item.image}`}
                  />
                </Link>
                <Card.Body>
                  <div className="community_cards_body">
                    <Link to={`/community-details/${item.id}`}>
                      <Card.Title className="newest_card_title">
                        {item.title}
                      </Card.Title>
                    </Link>
                    <Card.Text className="newest_card_text">
                      {item.description}
                    </Card.Text>
                    {isLoggedIn ? (
                      // {item.user_id==}
                      <div className="text-center px-3">
                        {item.user_id != userId ? (
                          <>
                            {joinstatus.includes(item.id) ? (
                              <>
                                <Button
                                  className="newest_categories_button btn-outline-success btn"
                                  onClick={() =>
                                    handleRemove(item.id, item.user_id)
                                  }
                                >
                                  Joined
                                </Button>
                              </>
                            ) : (
                              <Button
                                className="newest_categories_button btn-outline-success btn"
                                onClick={() => joined(item.id, item.user_id)}
                              >
                                Join Now {addButton}
                              </Button>
                            )}
                          </>
                        ) : (
                          <Button
                            className="newest_categories_button btn-outline-success btn"
                            disabled
                          >
                            Joined
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center px-3">
                        <Link
                          to="/signin"
                          className="newest_categories_button btn-outline-success btn"
                        >
                          Join Now {addButton}
                        </Link>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Cards;
