import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown, ListGroup, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import profileicon from "../../Assets/images/profileicon.png";
import Chatimage from "../../Assets/images/image-8.png";
import { useNavigate } from "react-router-dom";
import Image8 from "../../Assets/images/image-8.png";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Base_URL,
  COMMUNITYSMALLIMG_URL,
  PROFILEIMG_URL,
} from "../../utils/serverUrl";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, google, facebook } from "../../firebase";
import { vectordown } from "../../utils/svg.file";

const Headers = () => {
  let navigate = useNavigate();
  // const isLoggedIn = localStorage.getItem("userToken");
  const [search, setSearch] = useState("");
  const [isSuggestedSearch, setIsSuggestedSearch] = useState(false);
  const [imgprofile, setImgprofile] = useState();
  const [searchData, setSearchData] = useState([]);

  const onSearch = () => {
    var data = new FormData();
    data.append("text", search);

    var config = {
      method: "post",
      url: `${Base_URL}searchcommunity`,

      data: data,
    };

    axios(config)
      .then(function(response) {
        setSearchData(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const onHandleSearch = () => {
    setIsSuggestedSearch(!isSuggestedSearch);
    onSearch();
  };
  // const header = [
  //   {
  //     image: Image8,
  //     title: "Community 1 ",
  //     text: "Lorem ipsum sit dolor",
  //   },
  //   {
  //     image: Image8,
  //     title: "Community 2 ",
  //     text: "Lorem ipsum sit dolor",
  //   },
  //   {
  //     image: Image8,
  //     title: "Community 3 ",
  //     text: "Lorem ipsum sit dolor",
  //     borderNone: "lastborder",
  //   },
  // ];
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");

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
        setImgprofile(response.data.success.image);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) showprofile();
  }, []);

  const logout = () => {
    signOut(auth)
      .then((res) => {
        // setUser(null);
        localStorage.clear();
        // FirebaseAuth.getInstance().signOut();
        // LoginManager.getInstance().logOut();
        navigate("/");
        // console.log("Logout Succes", res);
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("Logout fail", error);
        // An error happened.
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log({ user });
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // console.log("user SignOut");
      // User is signed out
      // ...
    }
  });
  // const logout = () => {
  //   document.cookie.split(";").forEach((c) => {
  //     document.cookie = c
  //       .replace(/^ +/, "")
  //       .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  //   });
  // };

  // const deleteAllCookies = () => {
  //   var cookies = document.cookie.split(";");

  //   for (var i = 0; i < cookies.length; i++) {
  //     var cookie = cookies[i];
  //     var eqPos = cookie.indexOf("=");
  //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  //   }
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar className="header_navbar" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="header_navbar_brand">
            OW
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center align-items-start">
              <Form className="d-flex">
                <div className="header_search_input d-lg-block d-md-block d-none">
                  <Form.Control
                    type="search"
                    placeholder="Search for Communities"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      onHandleSearch();
                    }}
                    // onClick={onHandleSearch}
                    className="header_search_form_input"
                  />
                  <CiSearch className="header_search_icon" />
                </div>
                {isSuggestedSearch ? (
                  <>
                    <div className="searchbar_search">
                      <div className="searchscroll">
                        <PerfectScrollbar>
                          {searchData.map((item, index) => (
                            <Link to={`/community-details/${item.id}`}>
                              <Stack
                                direction="horizontal"
                                gap={4}
                                className={`searchbar_underline ${item.borderNone}`}
                              >
                                <div>
                                  <img
                                    src={
                                      item.image
                                        ? `${COMMUNITYSMALLIMG_URL}${item.image}`
                                        : Image8
                                    }
                                    className="searchbar_search_img"
                                  />
                                </div>
                                <div className="">
                                  <span className="searchbar_search_title">
                                    {item.title}
                                  </span>{" "}
                                  <p className="searchbar_search_text">
                                    {item.about}
                                  </p>
                                </div>
                              </Stack>
                            </Link>
                          ))}
                        </PerfectScrollbar>
                      </div>
                      <div className="text-center mb-2 border-top">
                        <button
                          className="searchbar_search_btn"
                          onClick={() => navigate("/search/1")}
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </Form>

              <Link to="/" className="header_navbar_link_chat nav-link ">
                HOME
              </Link>
              <NavDropdown
                as="a"
                title={
                  isLoggedIn ? (
                    <>
                      my Communities <span>{vectordown}</span>
                    </>
                  ) : (
                    "Communities"
                  )
                }
                id="basic-nav-dropdown"
                className="header_navbar_dropdown text-decoration-none commom-space"
              >
                <NavDropdown.Item
                  // href="/my-communities"
                  onClick={() => {
                    navigate("/my-communities");
                  }}
                  className="header_navbar_navdropdown_item"
                >
                  My Communities
                </NavDropdown.Item>
                {isLoggedIn ? (
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/create-communities");
                    }}
                    // href="/create-communities"
                    className="header_navbar_navdropdown_item"
                  >
                    Create Communities
                  </NavDropdown.Item>
                ) : (
                  ""
                )}
              </NavDropdown>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/chat"
                    className="header_navbar_link_chat nav-link commom-space"
                  >
                    Messages
                    <span className="count">5</span>
                  </Link>
                  <Link
                    to="/invits"
                    className="header_navbar_link_chat nav-link commom-space"
                  >
                    Invites
                  </Link>
                  <Dropdown as="a" className="commom-space">
                    <Dropdown.Toggle
                      className="notifation"
                      as="a"
                      variant="false"
                      id="dropdown-basic"
                    >
                      <FaRegBell />
                      <sup className="count">3</sup>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="rightsidemenu">
                      <div className="notification-ui_dd-header">
                        <h3>Notification</h3>
                        <span className="mark-read">Mark all as read</span>
                      </div>

                      <ListGroup variant="flush">
                        {[1, 2, 3, 4, 5].map((item, index) => (
                          <ListGroup.Item
                            key={index}
                            as="a"
                            href="#"
                            className={`item-hover ${
                              index === 0 ? "selected" : ""
                            }`}
                          >
                            <Stack
                              gap={2}
                              direction="horizontal"
                              className="align-items-start"
                            >
                              <div className="avatar">
                                <img src={profileicon} alt="" />
                              </div>
                              <div className="notification-list_detail">
                                <h3>
                                  Jenny Wilson <span>2 min ago</span>
                                </h3>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetuer
                                  adipiscing elit, sed diam nonummy nibh euismod
                                  tincidunt .
                                </p>
                              </div>
                            </Stack>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown as="a" className="commom-space ms-lg-4">
                    <Dropdown.Toggle as="div" className="profiledropdown ">
                      <img
                        src={
                          imgprofile
                            ? `${PROFILEIMG_URL}${imgprofile}`
                            : Chatimage
                        }
                        // {Chatimage}
                        alt=""
                        className="header_navbar_img"
                      />
                      <span className="ms-2">{vectordown}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="profile-dropdown">
                      <Dropdown.Item
                        className="profile_dropdown_item"
                        // href="#"
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="profile_dropdown_item"
                        // href="#"
                        onClick={() => {
                          navigate("/dashboard");
                        }}
                      >
                        Dashboard
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={logout}
                        // onClick={() => {
                        //   localStorage.clear();

                        //   // Cookies.remove("SID");
                        //   navigate("/");
                        //   // signOutGoogle(() => {

                        //   // console.log("LoggedOut");

                        //   // });

                        //   // window.location.reload();
                        // }}
                      >
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Nav.Link
                    href="/#"
                    className="header_navbar_link commom-space"
                  >
                    About Us
                  </Nav.Link>
                  <Nav.Link
                    href="/chapteradd"
                    className="header_navbar_link commom-space"
                  >
                    Contact Us
                  </Nav.Link>
                  <Link to="/signin" className="text-uppercase">
                    <Button className="header_nabvar_button">Sign In</Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
