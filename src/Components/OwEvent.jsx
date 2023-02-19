import React, { useState } from "react";
import { Button, Container, Nav, Stack, Tab } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../Assets/Css/owevent.css";
import Footer from "./Layouts/Footer";
import Headers from "./Layouts/Headers";
import { SideRight, SideLeft } from "../utils/svg.file";
import Event from "../Assets/images/event.png";
import moment from "moment";
import ApprovedEvents from "../Components/ApprovedEvents";
import PendingEvent from "../Components/PendingEvent";
import PendingEventEdit from "../Components/PendingEventEdit";
import EventsRemoval from "../Components/EventsRemoval";
import { Base_URL, CHAPTERIMG_URL } from "../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import { useState } from "react";

const OwEvent = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showchap, setShowchap] = useState([]);
  const [loading, setLoading] = React.useState(false);
  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const params = useParams();
  const ID = params.id;
  const date_update = moment(showchap.date).format(" D MMMM YYYY");

  const showchapters = () => {
    var data = new FormData();
    data.append("id", ID);

    var config = {
      method: "post",
      url: `${Base_URL}showchapter`,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Authorization: "Bearer " + isLoggedIn,
      // },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setLoading(true);
        setShowchap(response.data.data);
        console.log(response.data.data, "show chepter in event page ");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showchapters();
  }, []);

  return (
    <>
      <Headers />

      <Container>
        <div className="owevent_first_section">
          <Stack direction="horizontal">
            <div className="">
              <p className="owevent_first_section_p">
                <Link
                  to="/create-communities"
                  className="owevent_first_section_link"
                >
                  Back to Community
                </Link>
              </p>
            </div>
            <div className="owevent_heading_left">
              <h2 className="owevent_heading_first">
                {showchap.title}
                <span className="owevent_heading_community1">
                  @{showchap.community_handle}
                </span>
              </h2>
            </div>
          </Stack>
        </div>
      </Container>

      <div className="ow_event">
        <Container>
          <Stack direction="horizontal" gap={3}>
            {/* <div className="ow_event_btn me-auto">
              <Button className="owevent_btn">
                {SideRight} Previous Chapter
              </Button>
            </div> */}
            <div className="m-auto">
              <h3 className="owevent_middle_heading">
                {showchap.chapter_name}
              </h3>
            </div>
            {/* <div className="ow_event_btn ms-auto">
              <Button className="owevent_btn"> Next Chapter {SideLeft}</Button>
            </div> */}
          </Stack>
          <div>
            <h5 className="ow_event_h5">
              @{showchap.user_name}| {date_update}
            </h5>
            <div className="text-center">
              <img
                src={`${CHAPTERIMG_URL}${showchap.images}`}
                className="ow_event_img"
              />
            </div>
            <p className="owevent_text">{showchap.description}</p>
          </div>
        </Container>
      </div>
      <section>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Container>
            <div className="owevent_button_tab">
              <Nav variant="pills" className="">
                <Nav.Item>
                  <Nav.Link eventKey="first">Approved Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    // onClick={() => setIsSubmitting(true)}
                  >
                    Pending Events
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="three">Pending Events Edits</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="four">Events Removal</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Container>
          <div className="ow_event py-5">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ApprovedEvents
                  name="Event Name"
                  subitemtext="@user431"
                  none="d-none"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <PendingEvent
                  name="Event Name"
                  subtext="@user431"
                  isSubmitting={isSubmitting}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="three">
                <PendingEventEdit
                  name="Event Name"
                  subtext="@user431"
                  none="d-none"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="four">
                <EventsRemoval none="d-none" name="Event Name" />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </section>

      <Footer />
    </>
  );
};

export default OwEvent;
