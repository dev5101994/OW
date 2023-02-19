import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const InviteModal = ({ show, handleClose }) => {
  return (
    <>
      <div className="modal_backcolor">
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className="modal_backcolor"
        >
          <Modal.Title className="modal_invits">Invite members</Modal.Title>
          <hr />

          <Modal.Body>
            <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label modal_select_invits"
              >
                Select Community
              </label>
              <Form.Select size="sm" className="modal_select_invits_option">
                <option>select</option>
              </Form.Select>
            </div>
            <div className="mb-3">
              <label
                for="exampleFormControlInput1"
                className="form-label modal_select_invits"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control modal_select_invits_option"
                id="exampleFormControlInput1"
                placeholder="type here"
              />
            </div>
            <div className="mb-3">
              <div>
                <input class="with-gap" name="group1" type="radio" id="test3" />
                <lable for="test3" className="modal_radio">
                  Founder
                </lable>
              </div>
              {/* <div>
                <input class="with-gap" name="group1" type="radio" id="test4" />

                <lable for="test4" className="modal_radio">
                  Member
                </lable>
              </div> */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default InviteModal;
