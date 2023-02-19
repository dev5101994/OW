import { React, useState } from "react";
import "../Assets/Css/styles.css";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Base_URL } from "../utils/serverUrl";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { uploadIcon } from "../utils/svg.file";

const UploadFile = styled(Button)({
  background: "rgba(216, 222, 233, 0.2)",
  border: " 2px dashed #C4C4C4",
  borderRadius: "5px",
  color: "#465BBA",
  padding: 15,
  textTransform: "capitalize",
});

const AddCategory = (props) => {

  const [name, setName] = useState();
  const [discription, setDiscription] = useState();
  const [file, setFile] = useState();


  // const fetchData =() =>{
  // const [cardArray, setcardArray] = useState([]);
  const isLoggedIn = (localStorage.getItem("userToken") || "").split(`"`)[1];

  const fetchData = (e) => {
    var data = new FormData();
    data.append("name", name);
    data.append("file", file);
    data.append("discription", discription);

    var config = {
      method: "post",

      url: `${Base_URL}admin/update-category`,
      headers: {
        Authorization: `Bearer ${isLoggedIn}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });
    // setName({ name: '' });
    // setDiscription({ discription: '' });
    setDiscription('');
    setName('');
    setFile('');
    // e.target.reset();
  };

  return (
    <>
      <Modal {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="text-center">Add Category</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Enter Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Upload</Form.Label>
              <UploadFile component="label" fullWidth>
                <div className="d-block text-center">
                  {uploadIcon}
                  <div className="browse-text">
                    <span>Browse Uploads</span> or <span>Browse Local</span>
                  </div>
                  <span className="upload-text">Upload</span>
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </UploadFile>
            </Form.Group>
            <div className="text-center py-3">
              <Button className="addcategory_btn" onClick={fetchData}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCategory;
