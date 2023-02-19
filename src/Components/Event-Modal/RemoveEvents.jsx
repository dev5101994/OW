import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Event1 from "../../Assets/images/event1.png";
import { Base_URL, EVENTIMG_URL } from "../../utils/serverUrl";

const RemoveEvents = ({ show, onHide, id }) => {
  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const [approveventdata, setApproveventdata] = React.useState([]);
  const [description, setDescription] = React.useState();
  const [usernames, setUsername] = React.useState("");
  const Id = id;
  // console.log(Id, "event id in remove");
  const showApprovedevent = () => {
    var data = new FormData();
    data.append("id", Id);

    var config = {
      method: "post",
      url: `${Base_URL}edit-event`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data, " event remove data");
        setUsername(response.data);
        setApproveventdata(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showApprovedevent();
  }, [id]);

  const removeevent = () => {
    var data = new FormData();
    data.append("message", description);
    data.append("id", Id);

    var config = {
      method: "POST",
      url: `${Base_URL}removeevent`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },

      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    removeevent();
  }, []);

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Events</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="">
            <h3 className="event_ow_head"> {approveventdata.event_name}</h3>
            <h4 className="event_ow_sub_head mb-4">
              User@{usernames.username}
            </h4>
            <img
              src={
                approveventdata
                  ? `${EVENTIMG_URL}${approveventdata.images}`
                  : Event1
              }
              className="w-50 mb-3"
            />
            <p>
              {approveventdata.description}
              {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad. */}
            </p>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <textarea
                className="textareabox"
                placeholder="Message"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Form.Group>
          </Form>
          <div className="add_events_btn_div">
            <Button
              variant="outline"
              className="add_events_close_btn"
              onClick={onHide}
            >
              Close
            </Button>
            <Button
              className="add_events_add_btn"
              onClick={() => {
                onHide();
                removeevent();
              }}
            >
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveEvents;
