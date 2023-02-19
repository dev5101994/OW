import React from "react";
import "../../Assets/Css/communitydetailpage.css";
import "../../Assets/Css/owevent.css";
import { Container, Stack } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Down, plusIcon, Up } from "../../utils/svg.file";
import ShowChapter from "../../Assets/images/show-chapter.png";
import { Link, useParams } from "react-router-dom";
import { Base_URL, CHAPTERIMG_URL } from "../../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";
import { IconButton } from "@mui/material";

const Community6 = ({ isSubmitting, pendingchapters }) => {
  let act_id = localStorage?.getItem("act_id");
  let community_id = localStorage?.getItem("community_id");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  // const [pendingchapters, setPendingchapter] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [counterset, setCounter] = React.useState(0);
  const [upVote, setUpVote] = React.useState([]);
  const [downVote, setDownVote] = React.useState([]);
  const [isUpVote, setIsUpVote] = React.useState(false);
  const [isDownVote, setIsDownVote] = React.useState(false);
  const params = useParams();
  console.log(pendingchapters, "panding chapter props");

  // const pendingchapter = () => {
  //   var data = new FormData();
  //   data.append("community_id", community_id);
  //   data.append("act_id", act_id);

  //   var config = {
  //     method: "post",
  //     url: `${Base_URL}chapterpending-list`,

  //     data: data,
  //   };

  //   axios(config)
  //     .then(function(response) {
  //       console.log(response.data.data, "chapter valuesjkhjkhdsjkch");
  //       setPendingchapter(response.data.data);
  //       // setUsername(response.data.name);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };
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
    // pendingchapter();
    showcount();
  }, [isSubmitting]);

  return (
    <>
      <Container>
        {pendingchapters ? (
          <>
            {pendingchapters.map((item, index) => (
              <div className="owevent_back_last mb-4" key={index}>
                <Row>
                  <Col lg={4} md={6}>
                    <div>
                      <Link to={`/owevent/${item.id}`} className="color-none">
                        <img
                          src={`${CHAPTERIMG_URL}${item.images}`}
                          className="community_5_img"
                        />
                        {/* {ShowChapter} */}
                      </Link>
                    </div>
                  </Col>
                  <Col lg={8} md={6}>
                    <Stack
                      direction="horizontal"
                      className="align-items-baseline"
                    >
                      <h1 className="event_ow_head">
                        {item.chapter_name}
                        <p className="event_ow_sub_head"> @{item.user}</p>
                      </h1>
                      {isLoggedIn ? (
                        <>
                          <div className="pending_event_btn ms-auto">
                            <div
                              className="pendingevent_btn_plus"
                              onClick={() => counter("1", "0", item.id)}
                            >
                              {Up}{" "}
                              <span className="mx-2 text-light">
                                {upVote.find((el) => el.chapter_id === item.id)
                                  ?.total || 0}
                              </span>
                            </div>
                            <div
                              className="pendingevent_btn_mins"
                              onClick={() => counter("0", "1", item.id)}
                            >
                              {Down}{" "}
                              <p className="mx-2 text-light">
                                {downVote.find(
                                  (el) => el.chapter_id === item.id
                                )?.total || 0}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </Stack>
                    <span className="event_ow_text">{item.description}</span>
                  </Col>
                </Row>
                <h1 className="pending_event_edit_heading">
                  {item.time} hours remaining
                </h1>
              </div>
            ))}
          </>
        ) : null}
      </Container>
    </>
  );
};

export default Community6;
