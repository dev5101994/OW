// import { UploadFile } from "@mui/icons-material";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { uploadIcon } from "../../utils/svg.file";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { Base_URL } from "../../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "@mui/material";
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

const AddEvents = ({ show, onHide }) => {
  const [chapname, setchapName] = useState("");
  const [description, setDescription] = useState();
  // const [fileselect, setFileselect] = React.useState("");
  const [addimages, setAddImages] = useState();
  const [addevent, setAddevent] = useState();
  const [chapandactname, setChapandactname] = useState([]);
  const [fileselect, setFileselect] = React.useState("");
  const [imghome, setImghome] = React.useState("");

  let communityId = localStorage.getItem("community_id");
  let commid = communityId?.replace(/^"(.+)"$/, "$1");
  let act_Id = localStorage.getItem("act_id");
  let tokenId = localStorage.getItem("userToken");
  let userId = localStorage.getItem("userId");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const params = useParams();
  const ID = params.id;

  // const fileupload = (e) => {
  //   var reader = new FileReader();
  //   setAddImages(e.target.files[0]);
  //   reader.onloadend = function() {
  //     setFileselect(reader.result);
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };
  // console.log(ID, addimages, act_Id, chapname, description, "value");
  const eventshowchapter = () => {
    var data = new FormData();
    data.append("chapter_id", ID);
    data.append("act_id", act_Id);

    var config = {
      method: "post",
      url: `${Base_URL}eventshowchapter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data.data, "show  chapter and act name");
        setChapandactname(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    eventshowchapter();
  }, []);
  const addeven = () => {
    console.log(userId, "idf");
    var data = new FormData();
    data.append("chapter_id", ID);
    data.append("act_id", act_Id);
    data.append("image", imghome);
    data.append("event_name", chapname);
    data.append("description", description);
    data.append("user_id", userId);

    var config = {
      method: "post",
      url: `${Base_URL}add-event`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setAddevent(response.data.data);

        test();
        // console.log(response.data.data, "show  list");
        // setImghome("");
      })
      .catch(function(error) {
        console.log(error);
      });
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
  const test = () => {
    onHide();
    setFileList([]);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <>
              {chapandactname.map((item) => (
                <>
                  <Form.Group className="mb-3 newchapater">
                    <Form.Label>Choose Act</Form.Label>
                    <Form.Select className="form_select_input">
                      <option className="py-3">{item.act_name}</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 newchapater">
                    <Form.Label>Choose Chapter</Form.Label>
                    <Form.Select className="form_select_input">
                      <option className="py-3">{item.chapter}</option>
                    </Form.Select>
                  </Form.Group>
                </>
              ))}
            </>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <input
                className="form-control-input"
                placeholder="Event type"
                onChange={(e) => setchapName(e.target.value)}
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
              <Form.Label className="d-block">Add Images</Form.Label>
              {/* <UploadFile component="label" fullWidth>
                <div
                  className="d-block text-center"
                  style={{
                    backgroundImage: `url(${fileselect})`,
                    backgroundRepeat: "no-repeat",
                  }}
                >
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
              <ImgCrop rotate className="img-crop-new">
                <Upload
                  action="https://digimonk.co/overwritedev/public/images/communityimgs/"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  className="img-crop"
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Group>
          </Form>
          <div className="add_events_btn_div">
            <Button
              variant="outline"
              className="add_events_close_btn"
              onClick={test}
            >
              Close
            </Button>
            <Button
              className="add_events_add_btn"
              onClick={() => {
                addeven();
                onHide();
              }}
              // onSubmit=
            >
              Add
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEvents;
