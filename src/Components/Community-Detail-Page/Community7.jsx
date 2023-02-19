import React, { useEffect } from "react";
import "../../Assets/Css/communitydetailpage.css";
import "../../Assets/Css/owevent.css";
import { Button, Container, Stack } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Down, plusIcon, Up } from "../../utils/svg.file";
import ShowChapter from "../../Assets/images/show-chapter.png";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import axios from "axios";
import { Base_URL, CHAPTERIMG_URL } from "../../utils/serverUrl";

const Community7 = (props) => {
  let act_id = localStorage?.getItem("act_id");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const [showeditofchapter, setShoweditofChapter] = React.useState([]);
  const [upVote, setUpVote] = React.useState([]);
  const [downVote, setDownVote] = React.useState([]);
  const [isUpVote, setIsUpVote] = React.useState(false);
  const [isDownVote, setIsDownVote] = React.useState(false);
  const [counterset, setCounter] = React.useState(0);
  let community_id = localStorage?.getItem("community_id");

  const showpandingeditchapter = () => {
    var data = new FormData();
    data.append("act_id", act_id);

    var config = {
      method: "post",
      url: `${Base_URL}showeditChapter `,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "show chapterhgghghg");
        setShoweditofChapter(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const counter = (param, params_down, id) => {
    var data = new FormData();
    data.append("community_id", community_id);
    data.append("act_id", act_id);
    data.append("status", param);
    data.append("chapter_id", id);
    data.append("counter_down", params_down);

    var config = {
      method: "post",
      url: `${Base_URL}update_chapter_counter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data, "act data");
        showcount();
      })
      .catch(function(error) {
        console.log(error);
      });

    setCounter(param);
  };

  const showcount = () => {
    var data = new FormData();
    data.append("act_id", act_id);

    var config = {
      method: "post",
      url: `${Base_URL}show_chapter_count`,

      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data.data), "res -- ");

        setUpVote(response.data.data.result_up);
        setDownVote(response.data.data.result_down);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showpandingeditchapter();
    showcount();
  }, []);


  return (
    <>
      <Container>
        {showeditofchapter.map((items) => (
          <div className="pendingeventedit_back_last">
            <h3 className="pending_event_edit_sub_heading">Before Edits</h3>
            <Link to={props.url} className="color-none mb-3">
              <Row>
                <Col lg={4} md={6}>
                  <div>
                    <img
                      src={
                        items?.images
                          ? `${CHAPTERIMG_URL}${items.images}`
                          : ShowChapter
                      }
                      className="community_5_img"
                    />
                  </div>
                </Col>
                <Col lg={8} md={6}>
                  <Stack direction="horizontal">
                    <div className="d-flex align-items-center">
                    <h1 className="event_ow_head">
                      {/* {props.name} */}
                      {items.chapter_name}
                     
                      <p className="event_ow_sub_head"> {items.user_name}</p>
                    </h1>
                    <Button className="community_7_50_events_btn ">
                        {items.event_count} Event
                      </Button>
                      </div>
                  </Stack>
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
                <Col sx={12}>
                  <h1 className="pending_event_edit_heading">
                    24 hours remaining
                  </h1>
                  <h3 className="pendingeventedit_sub_heading">After Edits</h3>
                </Col>
              </Row>
            </Link>
            <Link to={props.url} className="color-none">
              <Row>
                <Col lg={4} md={6}>
                  <div>
                    <img
                      src={
                        items?.editimages
                          ? `${CHAPTERIMG_URL}${items.editimages}`
                          : ShowChapter
                      }
                      className="community_5_img"
                    />
                  </div>
                </Col>
                <Col lg={8} md={6}>
                  <Stack direction="horizontal">
                    <div className="d-flex align-items-center">
                    <h1 className="event_ow_head">
                      {/* {props.name} */}
                      {items.edit_chapter_name}
                   
                      <p className="event_ow_sub_head"> {items.user_name}</p>
                    </h1>
                    <Button className="community_7_50_events_btn">
                        {items.event_count} Event
                      </Button>
                      </div>
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
            </Link>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Community7;
