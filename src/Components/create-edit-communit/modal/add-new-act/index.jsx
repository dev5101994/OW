import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { uploadIcon } from "../../../../utils/svg.file";
import { Base_URL } from "../../../../utils/serverUrl";
import uploadimg from "../../../../Assets/images/uploadimg.png";
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
const AddNewAct = ({ setIsSubmitting, isSubmitting }) => {
  const [actname, setActName] = useState("");
  const [description, setDescription] = useState();
  const [addimages, setAddImages] = useState();
  const [communityid, setCommunityid] = useState();
  const [fileselect, setFileselect] = React.useState("");
  const [imghome, setImghome] = React.useState("");

  let token = localStorage.getItem("community_id");
  let commid = token?.replace(/^"(.+)"$/, "$1");
  let localtoken = localStorage.getItem("userToken");
  let isLoggedIn = localtoken.replace(/^"(.+)"$/, "$1");

  const fileupload = (e) => {
    var reader = new FileReader();
    setAddImages(e.target.files[0]);
    reader.onloadend = function() {
      setFileselect(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = () => {
    // console.log("test");
    var data = new FormData();

    data.append("act_name", actname);
    data.append("image", imghome);
    data.append("description", description);
    data.append("community_id", commid);

    var config = {
      method: "post",
      url: `${Base_URL}add-communityact`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response);
        setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
    }
  }, [isSubmitting]);
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
      <div className="py-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Act name</Form.Label>
            <input
              className="form-control-input"
              placeholder="Enter act name here"
              onChange={(e) => setActName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <textarea
              className="textareabox form-control"
              placeholder="Description"

              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Add Images</Form.Label>
            <div className="position-relative imageuploads">
              {imghome ? "" :  <img src={uploadimg} />}
             
            
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
            </div>
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
      </div>
    </>
  );
};
export default AddNewAct;
