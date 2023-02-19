import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Assets/Css/addevents.css";
import { addSign, cloudIcon } from "../../utils/svg.file";
import Event1 from "../../Assets/images/event1.png"

const RemoveModal = (props) => {
  return (
    <>
      <Modal show={props.remove} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title className="addevents_title">Remove Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1 className="remove_events_heading">Event Name</h1>
            <h4 className="remove_events_sub_heading">@user431</h4>
            <img src={Event1} className="remove_events_img" />
            <p className="removal_events_text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad.
            </p>
          </div>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="addevents_label">Message</Form.Label>
              <Form.Control
                className="addevents_description"
                as="textarea"
                rows={5}
                placeholder="Please type your reason for wanting
                to remove this chapter"
              />
            </Form.Group>
          </Form>
          <div className="addevents_buttons">
            <Button variant="outline" className="addevents_btn_cancel">
              Cancel
            </Button>
            <Button className="removeevents_btn_submit">Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveModal;
