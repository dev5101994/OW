import React, {useState} from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../Assets/Css/owevent.css";
import Footer from "../Layouts/Footer";
import Headers from "../Layouts/Headers";
import { SideRight, SideLeft, threeDots, addSign } from "../../utils/svg.file";
import Event from "../../Assets/images/show-chapter.png";
import Event1 from "../../Assets/images/event1.png";
import AddModal from "./AddEvents";
import RemoveModal from "./RemoveEvents";
import EditModal from "./EditEvents";

const ViewChapter = () => {
    const [show, setShow] = useState(false);
    const [remove, setRemove] = useState(false);
    const [edit, setEdit] = useState(false);
   
    const handleRemove = () => setRemove(true);
    const handleEdit = () => setEdit(true);
    const handleShow = () => setShow(true);
     
     const handleClose=()=>{
        setRemove(false);
        setShow(false);
        setEdit(false);
     }
  return (
    <>
      <Headers />
      <Container>
        <div className="owevent_first_section">
          <Stack direction="horizontal">
            <div className="">
              <p className="owevent_first_section_p">
                <Link to="#" className="owevent_first_section_link">
                  Back to Community
                </Link>
              </p>
            </div>
            <div className="owevent_heading_left">
              <h2 className="owevent_heading_first">
                Bikers of Californiya by
                <span className="owevent_heading_community1"> @community1</span>
              </h2>
            </div>
          </Stack>
        </div>
      </Container>
      <div className="ow_event">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <div className="ow_event_btn me-auto">
              <Button className="owevent_btn">
                {SideRight} Previous Chapter
              </Button>
            </div>
            <div className="m-auto">
              <h3 className="owevent_middle_heading">bigbear444</h3>
            </div>
            <div className="ow_event_btn ms-auto">
              <Button className="owevent_btn"> Next Chapter {SideLeft}</Button>
            </div>
          </Stack>
          <div className="mb-3">
            <h5 className="ow_event_h5">@andrew | September 21, 2022</h5>
            <div className="text-center">
              <img src={Event} className="ow_event_img" />
            </div>
            <p className="owevent_text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        </Container>
      </div>
      <div className="owevent_button_tab">
        <a href="/owevent" className="approved_events">
          <Button className="ow_event_btn_tab active">Approved Events</Button>
        </a>
        <a href="/pendingevent" className="approved_events">
          <Button className="ow_event_btn_tab active">Pending Events</Button>
        </a>
        <a href="/pendingeventedit" className="approved_events">
          <Button className="ow_event_btn_tab active">
            Pending Events Edits
          </Button>
        </a>
        <a href="/eventsremoval" className="approved_events">
          <Button className="ow_event_btn_tab active">Events Removal</Button>
        </a>
      </div>
      <div className="ow_event">
        <Container>
          <div className="owevent_back_last">
            <Row>
              <Col lg={4} md={6}>
                <div>
                  <img src={Event1} className="w-100" />
                </div>
              </Col>
              <Col lg={8} md={6}>
                <Stack direction="horizontal" className="align-items-baseline">
                  <h1 className="event_ow_head">
                    Event Name <p className="event_ow_sub_head"> @user431</p>
                  </h1>
                  <div className="ms-auto">
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-custom-components"
                        className="viewchapter_dropdown_btn"
                      >
                        {threeDots}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="1" onClick={handleEdit}>
                          Edit
                        </Dropdown.Item>
                        <hr className="m-0" />
                        <Dropdown.Item eventKey="2" onClick={handleRemove}>
                          Remove
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3">Report</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Stack>
                <span className="event_ow_text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh consectetuer adipiscing elit, sed diam nonummy
                  nibh
                </span>
              </Col>
            </Row>
          </div>
          <div className="viewchapter_back_second">
            <Row>
              <Col lg={4} md={6}>
                <div>
                  <img src={Event1} className="w-100" />
                </div>
              </Col>
              <Col lg={8} md={6}>
                <Stack direction="horizontal" className="align-items-baseline">
                  <h1 className="event_ow_head">
                    Event Name <p className="event_ow_sub_head"> @user431</p>
                  </h1>
                  <div className="ms-auto">
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-custom-components"
                        className="viewchapter_dropdown_btn"
                      >
                        {threeDots}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="1" onClick={handleEdit}>
                          Edit
                        </Dropdown.Item>
                        <hr className="m-0" />
                        <Dropdown.Item eventKey="2" onClick={handleRemove}>
                          Remove
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3">Report</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Stack>
                <span className="event_ow_text">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl Lorem
                  ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                  nonummy nibh consectetuer adipiscing elit, sed diam nonummy
                  nibh
                </span>
              </Col>
            </Row>
          </div>
          <div>
            <Card className="viewchapter_add_new_card" onClick={handleShow}>
              <Card.Body className="viewchapter_card_body_add_new">
                <p className="viewchapter_card_add_icon">{addSign}</p>
                <Card.Title className="viewchapter_card_add_new_title">
                  Add New Event
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      <AddModal show={show} handleClose={handleClose} />
      <EditModal edit={edit} handleClose={handleClose} />
      <RemoveModal remove={remove} handleClose={handleClose} />
      <Footer />
    </>
  );
};

export default ViewChapter;
