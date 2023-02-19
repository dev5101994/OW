import { Button } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { uploadIcon } from "../../../../utils/svg.file";
import Event1 from "../../../../Assets/images/event1.png";
import { useEffect } from "react";
import { Base_URL, CHAPTERIMG_URL } from "../../../../utils/serverUrl";
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
const EditChapter = ({ setIsSubmitting, isSubmitting, chapterid }) => {
  const chapterId = chapterid;
  // console.log(chapterId, "iiidddddd");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const [chapterdata, setChapterdata] = React.useState([]);
  const [communitydata, setCommunitydata] = React.useState([]);
  const [chaptername, setChaptername] = React.useState("");
  const [chapterdes, setChapterdescription] = React.useState("");
  const [fileselect, setFileselect] = React.useState("");
  const [addimages, setAddImages] = React.useState();
  const [imghome, setImghome] = React.useState("");

  const fileupload = (e) => {
    var reader = new FileReader();
    setAddImages(e.target.files[0]);
    reader.onloadend = function() {
      setFileselect(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const editchapter = () => {
    var data = new FormData();
    data.append("id", chapterId);
    var config = {
      method: "post",
      url: `${Base_URL}edit-chapter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response, "chapter data");
        setCommunitydata(response.data.community);
        setChapterdata(response.data.data);

        console.log(chapterdata, "chapterdata");
        console.log(communitydata, "communitydata");
        // setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    editchapter();
  }, []);

  const handleSubmit = () => {
    var data = new FormData();

    data.append("image", imghome);
    data.append("chapter_id", chapterId);
    data.append("chapter_name", chaptername);
    data.append("description", chapterdes);
    var config = {
      method: "post",
      url: `${Base_URL}addeditChapter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response, "chapter submit");

        // setCommunitydata(response.data.community);
        // setChapterdata(response.data.data);

        // console.log(chapterdata, "chapterdata");
        // console.log(communitydata, "communitydata");
        // setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
      setIsSubmitting(false);
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
          <Form.Group>
            <div className="editchapter-text">
              <h1>{chapterdata.chapter_name}</h1>
              <span>@{communitydata.title}</span>
              <img
                src={
                  chapterdata
                    ? `${CHAPTERIMG_URL}${chapterdata.images}`
                    : Event1
                }
                alt="chapter img"
              />
              <p>
                {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad. */}
                {chapterdata.description}
              </p>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Chapter Name</Form.Label>
            <input
              className="form-control-input"
              placeholder="Enter act name here"
              onChange={(e) => {
                setChaptername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <textarea
              className="textareabox"
              placeholder="Description"
              onChange={(e) => {
                setChapterdescription(e.target.value);
              }}
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
      </div>
    </>
  );
};
export default EditChapter;
