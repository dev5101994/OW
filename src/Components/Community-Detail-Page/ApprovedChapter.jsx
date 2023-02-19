import React, { useEffect } from "react";
import { Row, Col, Stack, Dropdown, Container, Button } from "react-bootstrap";
import { threeDots } from "../../utils/svg.file";
import ShowChapter from "../../Assets/images/show-chapter.png";
import { Link, useParams } from "react-router-dom";
import { Base_URL, CHAPTERIMG_URL } from "../../utils/serverUrl";
import axios from "axios";

const ApprovedChapter = (props) => {
  let act_id = localStorage?.getItem("act_id");
  let community_id = localStorage?.getItem("community_id");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const [approfChapter, setApprofChapter] = React.useState([]);
  const params = useParams();
  const showAppchapter = () => {
    var data = new FormData();
    data.append("act_id", act_id);

    var config = {
      method: "post",
      url: `${Base_URL}showApprovedchapter`,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Authorization: "Bearer " + isLoggedIn,
      // },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data.data, "show chapter");
        setApprofChapter(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showAppchapter();
  }, []);

  return (
    <>
      <Container>
        {approfChapter?.map((items) => (
          <div className="owevent_back_last">
            <Row>
              <Col lg={4} md={6}>
                <Link
                  to={`/owevent/${items.id}`}
                  // {props.url}
                  className="color-none"
                >
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
                </Link>
              </Col>
              <Col lg={8} md={6}>
                <Stack direction="horizontal" className="align-items-baseline">
                  <div className="d-flex align-items-center">
                  <h1 className="event_ow_head">
                    {items?.chapter_name}
                    <p className="event_ow_sub_head">@{items?.user_name}</p>
                  </h1>
                  <Button className="community_7_50_events_btn">
                      {items?.event_count} Events
                    </Button></div>
                  <div className="ms-auto">
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-custom-components"
                        className="viewchapter_dropdown_btn"
                      >
                        {threeDots}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey="3"
                          onClick={() => {
                            props.handleClickOpen("editchapter", items.id);
                            // console.log({ items.id });
                          }}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="3"
                          onClick={() => {
                            props.handleClickOpen("removechapter", items.id);
                          }}
                        >
                          Remove
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="4">Report</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Stack>
                <Link to={props.url} className="color-none">
                  <span className="event_ow_text">{items.description}</span>
                </Link>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </>
  );
};

export default ApprovedChapter;
