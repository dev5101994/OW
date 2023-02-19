import React from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Assets/Css/owevent.css";
import Footer from "./Layouts/Footer";
import Headers from "./Layouts/Headers";
import { SideRight, SideLeft, Up, Down, plusIcon } from "../utils/svg.file";
import Event from "../Assets/images/event.png";
import Event1 from "../Assets/images/event1.png";
import { IconButton } from "@mui/material";
import { useState } from "react";
import AddEvents from "./Event-Modal/AddEvents";
import { useParams } from "react-router-dom";
import { Base_URL, EVENTIMG_URL } from "../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";

const PendingEvent = (props) => {
  const [pchap, setPchap] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [counterset, setCounter] = React.useState(0);
  const [upVote, setUpVote] = React.useState({});
  const [downVote, setDownVote] = React.useState({});
  const [isUpVote, setIsUpVote] = React.useState(false);
  const [isDownVote, setIsDownVote] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [show, setShow] = useState(false);

  let community_id = localStorage.getItem("community_id");
  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  let act_Id = localStorage.getItem("act_id");
  const params = useParams();
  const ID = params.id;

  const pendingevent = () => {
    var data = new FormData();
    data.append("chapter_id", ID);
    data.append("act_id", act_Id);

    var config = {
      method: "post",
      url: `${Base_URL}showevent`,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Authorization: "Bearer " + isLoggedIn,
      // },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setPchap(response.data.data);
        // setUsername(response.data.name);
        setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const counter = (param, params_down, id) => {
    var data = new FormData();
    data.append("community_id", community_id);
    data.append("act_id", act_Id);
    data.append("status", param);
    data.append("chapter_id", ID);
    data.append("event_id", id);
    data.append("status", param);
    data.append("counter_down", params_down);

    var config = {
      method: "post",
      url: `${Base_URL}update_event_counter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data, "event data");
        showcount();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const showcount = () => {
    var data = new FormData();
    data.append("chapter_id", ID);

    var config = {
      method: "post",
      url: `${Base_URL}show_event_count`,
      data: data,
    };

    axios(config)
      .then(function(response) {
        setUpVote(response.data.data.result_up);
        setDownVote(response.data.data.result_down);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    pendingevent();
    showcount();
  }, [isSubmitting]);

  return (
    <>
      <div className="ow_event">
        <Container>
          {pchap ? (
            <>
              {pchap.map((item, index) => (
                <div className="owevent_back_last">
                  <Row>
                    <Col lg={4} md={6}>
                      <div>
                        <img
                          src={`${EVENTIMG_URL}${item.images}`}
                          className="w-100"
                        />
                      </div>
                    </Col>
                    <Col lg={8} md={6}>
                      <Stack direction="horizontal">
                        <h1 className="event_ow_head">
                          {item.event_name}
                          <p className="event_ow_sub_head"> @{item.user}</p>
                        </h1>
                        {isLoggedIn ? (
                          <div className="pending_event_btn ms-auto">
                            <div
                              className="pendingevent_btn_plus"
                              onClick={() => counter("1", "0", item.id)}
                            >
                              {Up}{" "}
                              <span className="mx-2 text-light">
                                {" "}
                                {upVote.find((el) => el.event_id === item.id)
                                  ?.total || 0}
                              </span>
                            </div>
                            <div
                              className="pendingevent_btn_mins"
                              onClick={() => counter("0", "1", item.id)}
                            >
                              {Down}{" "}
                              <span className="mx-2 text-light">
                                {downVote.find((el) => el.event_id === item.id)
                                  ?.total || 0}
                              </span>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </Stack>
                      <span className="event_ow_text">
                        {item.description}
                        {/* Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl Lorem ipsum dolor sit amet,
                        consectetuer adipiscing elit, sed diam nonummy nibh
                        consectetuer adipiscing elit, sed diam nonummy nibh */}
                      </span>
                    </Col>
                  </Row>
                  <h1 className="pending_event_heading">
                    {item.time} hours remaining
                  </h1>
                </div>
              ))}
            </>
          ) : null}
        </Container>
        {isLoggedIn ? (
          <Container>
            <div className="add-new-act mt-3 min-auto py-5">
              <Stack
                direction="column"
                spacing={1}
                className="create-edit-member"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  onClick={() => setShow(true)}
                  disableRipple="false"
                  sx={{ p: 0 }}
                >
                  {plusIcon}
                </IconButton>
                <span className="add-member-text">Add New Pending Events</span>
              </Stack>
            </div>
          </Container>
        ) : (
          ""
        )}
      </div>
      <AddEvents
        show={show}
        onHide={() => {
          setShow(false);
          setIsSubmitting(true);
        }}
      />
    </>
  );
};

export default PendingEvent;
