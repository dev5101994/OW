import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Assets/Css/addevents.css";
import { addSign, cloudIcon } from "../../utils/svg.file";
import Event1 from "../../Assets/images/event1.png"

const EditModal = (props) => {
  return (
    <>
      <Modal show={props.edit} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title className="addevents_title">Add Events</Modal.Title>
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
        </Modal.Body>
        <Modal.Footer>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="addevents_label">Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                className="addevents_form_control"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="addevents_label">Description</Form.Label>
              <Form.Control
                className="addevents_description"
                as="textarea"
                rows={5}
                placeholder="description"
              />
            </Form.Group>
          </Form>
          <Form.Label className="addevents_label">Add Images</Form.Label>
          <Card className="addevents_add_new_card">
            <Card.Body className="addevents_card_body_add_new">
              <p className="addevents_card_add_icon">{cloudIcon}</p>
              <Card.Title className="addevents_card_add_new_title">
                <p className="addevents_card_title">Browse Uploads</p>
                <p className="mx-2">or</p>
                <p className="addevents_card_title">Browse Local</p>
              </Card.Title>
              <div>
                <Button className="addevents_card_btn">Upload</Button>
              </div>
            </Card.Body>
          </Card>
          <div className="addevents_buttons">
            <Button variant="outline" className="addevents_btn_cancel">
              Cancel
            </Button>
            <Button className="removeevents_btn_submit">Submit</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
