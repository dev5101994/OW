import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Form, Modal } from "react-bootstrap";
import { uploadIcon } from "../../utils/svg.file";
import Event1 from "../../Assets/images/event1.png";
import { Base_URL, EVENTIMG_URL } from "../../utils/serverUrl";
import axios from "axios";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";

const UploadFile = styled(Button)({
  background: "rgba(216, 222, 233, 0.2)",
  border: " 2px dashed #C4C4C4",
  borderRadius: "24px",
  color: "#465BBA",
  padding: 15,
  textTransform: "capitalize",
});

const EditEvents = ({ show, onHide, id }) => {
  const [approveventdata, setApproveventdata] = React.useState([]);
  const [usernames, setUsername] = React.useState("");
  const [eventname, setEventName] = React.useState("");
  const [description, setDescription] = React.useState();
  // const [addimages, setAddImages] = React.useState();
  const [fileselect, setFileselect] = React.useState("");
  const [addimages, setAddImages] = React.useState();
  const [imghome, setImghome] = React.useState("");
  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const Id = id;
  // console.log(Id, "event id in edit event");

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
        console.log(response.data, " event data");
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

  const addeditevent = () => {
    var data = new FormData();
    data.append("image", imghome);
    data.append("event_id", Id);
    data.append("event_name", eventname);
    data.append("description", description);

    var config = {
      method: "POST",
      url: `${Base_URL}addeditevent`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },

      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response);
        setFileselect("");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    addeditevent();
  }, []);

  const fileupload = (e) => {
    var reader = new FileReader();
    setAddImages(e.target.files[0]);
    reader.onloadend = function() {
      setFileselect(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // _____________img croprer________
  const [fileList, setFileList] = React.useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url:
    //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);
  const onChange = ({ fileList }) => {
    setFileList(fileList);
    setImghome(fileList[0].originFileObj);

    // console.log(fileList[0].originFileObj, "jain");
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  // _____________________img croper ___________________

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Events</Modal.Title>
        </Modal.Header>

        <div className="border-bottom">
          <Modal.Body>
            <h3 className="event_ow_head m-0"> {approveventdata.event_name}</h3>
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
          </Modal.Body>
        </div>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>New Event Name</Form.Label>
              <input
                className="form-control-input"
                placeholder="Chapter type"
                onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea
                className="textareabox"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Images</Form.Label>
              <ImgCrop rotate>
                <Upload
                  action="https://digimonk.co/overwritedev/public/images/communityimgs/"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
              {/* <UploadFile
                component="label"
                fullWidth
                style={{ backgroundImage: `url(${fileselect})` }}
              >
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
                    onChange={fileupload}
                  />
                </div>
              </UploadFile> */}
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
                addeditevent();
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

export default EditEvents;
