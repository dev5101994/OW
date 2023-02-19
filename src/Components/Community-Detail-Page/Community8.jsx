import React from "react";
import "../../Assets/Css/communitydetailpage.css";
import "../../Assets/Css/owevent.css";
import { Button, Container, Stack } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Down, plusIcon, Up } from "../../utils/svg.file";
import ShowChapter from "../../Assets/images/show-chapter.png";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { Base_URL, CHAPTERIMG_URL } from "../../utils/serverUrl";

const Community8 = (props) => {
  let act_id = localStorage?.getItem("act_id");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const [showremovechapter, setShoweremoveChapter] = React.useState([]);

  const showremoveChapter = () => {
    var data = new FormData();
    data.append("act_id", act_id);

    var config = {
      method: "post",
      url: `${Base_URL}showremoveChapter `,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data.data, "gaurav");
        setShoweremoveChapter(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showremoveChapter();
  }, []);
  console.log(showremovechapter, "remove");

  return (
    <>
      <Container>
        {showremovechapter.map((items) => (
          <Link to={props.url} className="color-none">
            <div className="events_removal_back_last">
              <Row>
                <Col lg={4} md={6}>
                  <div>
                    <img
                      src={
                        showremovechapter
                          ? `${CHAPTERIMG_URL}${items.images}`
                          : ShowChapter
                      }
                      className="community_5_img"
                    />
                  </div>
                </Col>
                <Col lg={8} md={6}>
                  <Stack direction="horizontal" className="align-items-center">
                    <div className="d-flex align-items-center">
                    <h1 className="event_ow_head">
                      {items.chapter_name}
                  
                      <p className="event_ow_sub_head"> @{items.user_name}</p>
                    </h1>
                    <Button className="community_7_50_events_btn">
                        {items.event_count} Events
                      </Button>
                      </div>
                    <div className="pending_event_btn ms-auto">
                      <div className="pendingevent_btn_plus">
                        {Up} <span className="mx-2 text-light">6</span>
                      </div>
                      <div className="pendingevent_btn_mins">
                        {Down} <span className="mx-2 text-light">0</span>
                      </div>
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
                <h4 className="events_removal_sub_heading">
                  Reason For Removal:
                </h4>
                <p className="events_removal_text">
                  {items.message}
                  {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh consectetuer adipiscing elit, sed diam nonummy
                  nibh{" "} */}
                </p>
                <h1 className="eventsremoval_heading">24 hours remaining</h1>
              </Row>
            </div>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default Community8;
