import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import "../Assets/Css/owevent.css";
import { Up, Down } from "../utils/svg.file";
import Event1 from "../Assets/images/event1.png";
import { useParams } from "react-router-dom";
import { Base_URL, EVENTIMG_URL } from "../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";

const PendingEventEdit = () => {
  let tokenId = localStorage.getItem("userToken");
  const [revoveedata, setRemoveEdata] = React.useState([]);
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const params = useParams();
  const ID = params.id;
  console.log(ID, "hello ");

  const showremoveEvent = () => {
    var data = new FormData();

    data.append("chapter_id", ID);

    var config = {
      method: "POST",
      url: `${Base_URL}showremoveEvent`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },

      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response, "remove event data");
        setRemoveEdata(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    showremoveEvent();
  }, []);

  return (
    <>
      <div className="ow_event">
        {revoveedata.map((items) => (
          <Container>
            <div className="events_removal_back_last">
              <Row>
                <Col lg={4} md={6}>
                  <div>
                    <img
                      src={
                        revoveedata ? `${EVENTIMG_URL}${items.images}` : Event1
                      }
                      className="w-100"
                    />
                  </div>
                </Col>
                <Col lg={8} md={6}>
                  <Stack direction="horizontal" className="align-items-center">
                    <h1 className="event_ow_head">
                      {items.event_name}
                      <p className="event_ow_sub_head"> @{items.user_name}</p>
                    </h1>
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
          </Container>
        ))}
      </div>
    </>
  );
};

export default PendingEventEdit;
