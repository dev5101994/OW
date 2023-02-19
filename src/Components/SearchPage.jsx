import React, { useEffect, useState } from "react";
import "../Assets/Css/styles.css";
import Headers from "../Components/Layouts/Headers";
import Footer from "../Components/Layouts/Footer";
import { Button } from "react-bootstrap";
import Image9 from "../Assets/images/image 9.png";
import Greenplus from "../Assets/images/greenplus.png";
import axios from "axios";
import { Base_URL, COMMUNITYSMALLIMG_URL } from "../utils/serverUrl";
import { useParams } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const SearchPage = () => {
  const [category, setcategory] = useState([]);
  const [card, setCard] = useState([]);
  const [requestdata, setRequestdata] = useState([]);
  const [joinstatus, setJoinstatus] = useState([]);
  const [allcomunity, setAllcomunity] = React.useState([]);
  let tokenId = localStorage.getItem("userToken");
  let userId = localStorage.getItem("userId");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const params = useParams();
  const catid = params.id;
  const [catids, setCatids] = useState(catid);

  const fetchData = async () => {
    var config = {
      method: "get",
      url: `${Base_URL}allcategory`,
    };

    axios(config)
      .then(function(response) {
        console.log({ response });
        setcategory(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const setcommunity = (id) => {
    setCatids(id);
    showcommunity();
  };
  const showcommunity = () => {
    var data = new FormData();
    data.append("id", catids);

    var config = {
      method: "post",
      url: `${Base_URL}category-community`,

      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data);
        setCard(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
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
        // console.log(response.data.data, "id");
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
  useEffect(() => {
    fetchData();
    showrequest();
  }, []);

  useEffect(() => {
    showcommunity();
  }, [catids]);

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
        // console.log(response?.data.data, "show communityin dashboard page");
        setAllcomunity(response?.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showCommunity();
  }, []);

  const card1 = [
    {
      image: Image9,
      community: "Community 1",
      text: "Loreum epsum sit dolor ",
    },
    {
      image: Image9,
      community: "Community 1",
      text: "Loreum epsum sit dolor ",
    },
    {
      image: Image9,
      community: "Community 1",
      text: "Loreum epsum sit dolor ",
    },
    {
      image: Image9,
      community: "Community 1",
      text: "Loreum epsum sit dolor ",
    },
  ];
  return (
    <>
      <Headers />

      <div className="shdaow mobileshadow">
        <div className="container">
          <h1 className="search_heading">Our Communities</h1>
          <p className="search_title">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt.
          </p>
        </div>
      </div>
      <div className="search_page">
        <div className="container">
          <h1 className="search_sub_heading">Search by characters</h1>
          <div>
            <nav class="AlphabetNav">
              <a href="#A">A</a>
              <a href="#B">B</a>
              <a href="#C">C</a>
              <a href="#D">D</a>
              <a href="#E">E</a>
              <a href="#F">F</a>
              <a href="#G">G</a>
              <a href="#H">H</a>
              <a href="#I">I</a>
              <a href="#J">J</a>
              <a href="#K">K</a>
              <a href="#L">L</a>
              <a href="#M">M</a>
              <a href="#N">N</a>
              <a href="#O">O</a>
              <a href="#P">P</a>
              <a href="#Q">Q</a>
              <a href="#R">R</a>
              <a href="#S">S</a>
              <a href="#T">T</a>
              <a href="#U">U</a>
              <a href="#V">V</a>
              <a href="#W">W</a>
              <a href="#X">X</a>
              <a href="#Y">Y</a>
              <a href="#Z">Z</a>
              <a href="#1">1</a>
              <a href="#1">2</a>
              <a href="#1">3</a>
              <a href="#1">4</a>
              <a href="#1">5</a>
              <a href="#1">6</a>
              <a href="#1">7</a>
              <a href="#1">8</a>
              <a href="#1">9</a>
              <a href="#1">0</a>
            </nav>
          </div>
          <hr className="search_hr_line" />

          <div className="row">
            <div className="col-lg-2 col-md-2">
              <div className="search_col_second_back">
                <div className="search_category_heading">Categories</div>
                {category.map((item) => (
                  <div
                    className={
                      Number(catids) === item.id
                        ? "search_category_heading_item active_search"
                        : "search_category_heading_item"
                    }
                    onClick={() => setcommunity(item.id)}
                  >
                    {Number(catids) === item.id ? (
                      <b>{item.name}</b>
                    ) : (
                      <>{item.name}</>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="search_col_second_back">
                <div className="search_category_heading ">
                  {card.length} result found for community
                </div>
                <>
                  {card.length > 0 ? (
                    <>
                      {card.map((items, index) => (
                        <div className="search_result_community">
                          <div className="ps-3">
                            <img
                              src={`${COMMUNITYSMALLIMG_URL}${items.image}`}
                              alt="img"
                              className="search_result_img"
                            />
                          </div>
                          <div className="search_result_community_p">
                            <p className="search_result_community_p_p1">
                              {items.title}
                            </p>
                            <p className="search_result_community_p_p2">
                              {items.community_handle}
                            </p>
                            <p className="search_result_community_p_p3">
                              {items.about}
                            </p>
                          </div>
                          <div className="search_result_button">
                            {items.user_id != userId ? (
                              <>
                                {joinstatus.includes(items.id) ? (
                                  <>
                                    <Button
                                      className="search_result_community_joined_button"
                                      onClick={() => handleRemove(items.id)}
                                    >
                                      Joined
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    className="search_result_community_button"
                                    onClick={() =>
                                      joined(items.id, items.user_id)
                                    }
                                  >
                                    Join Now
                                    <img
                                      src={Greenplus}
                                      alt="button"
                                      className="ms-2"
                                    />
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Button
                                className="search_result_community_joined_button"
                                disabled
                              >
                                Joined
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="search_category_heading border-0">
                      No Result Found
                    </div>
                  )}
                </>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="search_col_second_back">
                <div className="search_category_heading">
                  Featured Communities
                </div>
                <div className="listscroll">
                  <PerfectScrollbar>
                    {allcomunity.map((data) => (
                      <div className="search_result_community_feature">
                        <div className="ps-3">
                          <img
                            src={
                              data.image
                                ? `${COMMUNITYSMALLIMG_URL}${data.image}`
                                : Image9
                            }
                            // src={data.image}
                            alt="img"
                            className="search_result_img"
                          />
                        </div>
                        <div className="search_result_community_p">
                          <p className="search_result_community_p_feature">
                            {data.title}
                          </p>
                          <p className="search_result_community_p_feature_p2">
                            {data.about === "null"
                              ? "hello every one"
                              : data.about}
                          </p>
                        </div>
                      </div>
                    ))}
                  </PerfectScrollbar>
                </div>
              </div>

              <div className="search_col_second_back">
                <div className="search_category_heading">Top Communities</div>
                <div className="listscroll">
                  <PerfectScrollbar>
                    {allcomunity.map((data) => (
                      <div className="search_result_community_feature">
                        <div className="ps-3">
                          <img
                            src={
                              data.image
                                ? `${COMMUNITYSMALLIMG_URL}${data.image}`
                                : Image9
                            }
                            alt="img"
                            className="search_result_img"
                          />
                        </div>
                        <div className="search_result_community_p">
                          <p className="search_result_community_p_feature">
                            {data.title}
                          </p>
                          <p className="search_result_community_p_feature_p2">
                            {data.about === "null"
                              ? "hello every one"
                              : data.about}
                          </p>
                        </div>
                      </div>
                    ))}
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchPage;
