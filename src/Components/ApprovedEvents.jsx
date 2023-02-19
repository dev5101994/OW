import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../Assets/Css/owevent.css";
import { threeDots, plusIcon } from "../utils/svg.file";
import Event1 from "../Assets/images/event1.png";
import { IconButton } from "@mui/material";
import AddEvents from "./Event-Modal/AddEvents";
import EditEvents from "./Event-Modal/EditEvents";
import RemoveEvents from "./Event-Modal/RemoveEvents";
import { Base_URL, EVENTIMG_URL } from "../utils/serverUrl";
import axios from "axios";

const ApprovedEvents = (props) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [eventId, seteventId] = useState("");
  const [approveventdata, setApproveventdata] = React.useState([]);
  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const params = useParams();
  const ID = params.id;

  // console.log(ID, "chapter id");
  const handleClickOpen = (type) => {};

  const showApprovedevent = () => {
    var data = new FormData();
    data.append("chapter_id", ID);

    var config = {
      method: "post",
      url: `${Base_URL}showApprovedevent`,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Authorization: "Bearer " + isLoggedIn,
      // },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data.data, "approv event data");
        setApproveventdata(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showApprovedevent();
  }, []);
  return (
    <>
      <div className="ow_event">
        <Container>
          {approveventdata.map((items) => (
            <div className="owevent_back_last" key={items.id}>
              <Row>
                <Col lg={4} md={6}>
                  <Link className="color-none">
                    <div>
                      <img
                        src={
                          approveventdata
                            ? `${EVENTIMG_URL}${items.images}`
                            : Event1
                        }
                        className="community_5_img"
                      />
                    </div>
                  </Link>
                </Col>
                <Col lg={8} md={6}>
                  <Stack
                    direction="horizontal"
                    className="align-items-baseline"
                  >
                    <h1 className="event_ow_head">
                      {items.event_name}
                      <p className="event_ow_sub_head">@{items.user_name}</p>
                    </h1>
                    <div className={`ms-auto`}>
                      {isLoggedIn ? (
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-custom-components"
                            className="viewchapter_dropdown_btn"
                          >
                            {threeDots}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setEdit(true);
                                seteventId(items.id);
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setRemove(true);
                                seteventId(items.id);
                              }}
                            >
                              Remove
                            </Dropdown.Item>
                            <Dropdown.Item>Report</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        ""
                      )}
                    </div>
                  </Stack>
                  <Link to={props.url} className="color-none">
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
                  </Link>
                </Col>
              </Row>
            </div>
          ))}
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
                <span className="add-member-text">Add New Events</span>
              </Stack>
            </div>
          </Container>
        ) : (
          ""
        )}
      </div>
      <AddEvents show={show} onHide={() => setShow(false)} />
      <EditEvents show={edit} id={eventId} onHide={() => setEdit(false)} />
      <RemoveEvents
        show={remove}
        id={eventId}
        onHide={() => setRemove(false)}
      />
    </>
  );
};

export default ApprovedEvents;
