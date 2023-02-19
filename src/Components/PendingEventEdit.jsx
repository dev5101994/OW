import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import "../Assets/Css/owevent.css";
import { Up, Down } from "../utils/svg.file";
import Event1 from "../Assets/images/event1.png";
import { Link, useParams } from "react-router-dom";
import { Base_URL, EVENTIMG_URL } from "../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";

const PendingEventEdit = () => {
  const [showediteventdata, setShowediteventdata] = React.useState([]);
  const params = useParams();
  const ID = params.id;

  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const [counterset, setCounter] = React.useState(0);
  const [upVote, setUpVote] = React.useState({});
  const [downVote, setDownVote] = React.useState({});
  const [isUpVote, setIsUpVote] = React.useState(false);
  const [isDownVote, setIsDownVote] = React.useState(false);
  let community_id = localStorage.getItem("community_id");
  let act_Id = localStorage.getItem("act_id");
  const showeditevent = () => {
    var data = new FormData();
    data.append("chapter_id", ID);

    var config = {
      method: "post",
      url: `${Base_URL}showeditevent`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response, "pending edit  event data");
        // setApproveventdata(response.data.data);
        setShowediteventdata(response.data.data);
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
    showeditevent();
  }, []);

  return (
    <>
      <div className="ow_event">
        <Container>
          {showediteventdata.map((items) => (
            <div className="pendingeventedit_back_last">
              <Row>
                <h3 className="pending_event_edit_sub_heading">Before Edits</h3>
                <Col lg={4} md={6}>
                  <div>
                    <img
                      src={
                        showediteventdata
                          ? `${EVENTIMG_URL}${items.images}`
                          : Event1
                      }
                      className="w-100"
                    />
                  </div>
                </Col>
                <Col lg={8} md={6}>
                  <h1 className="event_ow_head">
                    {items.event_name}
                    <p className="event_ow_sub_head"> @{items.user_name}</p>
                  </h1>

                  <span className="event_ow_text">
                    {items.description}
                    {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl Lorem ipsum dolor sit amet, consectetuer adipiscing
                    elit, sed diam nonummy nibh consectetuer adipiscing elit,
                    sed diam nonummy nibh */}
                  </span>
                </Col>
                <h1 className="pending_event_edit_heading">
                  24 hours remaining
                </h1>
                <h3 className="pendingeventedit_sub_heading">After Edits</h3>
                <Col lg={4} md={6}>
                  <div>
                    <img
                      src={
                        showediteventdata
                          ? `${EVENTIMG_URL}${items.editimages}`
                          : Event1
                      }
                      className="w-100"
                    />
                  </div>
                </Col>
                <Col lg={8} md={6}>
                  <Stack direction="horizontal">
                    <h1 className="event_ow_head">
                      Event Name{items.edit_event_name}
                      <p className="eve</Stack>nt_ow_sub_head">
                        @{items.user_name}
                      </p>
                    </h1>
                    {isLoggedIn ? (
                        <>
                          <div className="pending_event_btn ms-auto">
                            <div
                              className="pendingevent_btn_plus"
                              onClick={() => counter("1", "0", items.id)}
                            >
                              {Up}{" "}
                              <span className="mx-2 text-light">
                                {upVote.find((el) => el.chapter_id === items.id)
                                  ?.total || 0}
                              </span>
                            </div>
                            <div
                              className="pendingevent_btn_mins"
                              onClick={() => counter("0", "1", items.id)}
                            >
                              {Down}{" "}
                              <span className="mx-2 text-light">
                                {downVote.find(
                                  (el) => el.chapter_id === items.id
                                )?.total || 0}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                  </Stack>
                  <span className="event_ow_text">
                    {items.edit_description}
                 
                  </span>
                </Col>
              </Row>
              <h1 className="pending_event_edit_heading">24 hours remaining</h1>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default PendingEventEdit;
