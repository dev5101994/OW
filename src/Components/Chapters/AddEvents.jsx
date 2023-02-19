import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Assets/Css/addevents.css";
import { addSign, cloudIcon } from "../../utils/svg.file";

const AddModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title className="addevents_title">Add Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="addevents_label">Choose Act</Form.Label>
              <Form.Select
                className="addevents_select"
                aria-label="Default select example"
              >
                <option>select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="addevents_label">
                Choose Chapter
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="addevents_select"
              >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="addevents_label">
                    Event Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter name"
                    className="addevents_form_control"
                  />
                </Form.Group>
                <option>select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
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
            <Button className="addevents_btn_add">Add</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModal;
