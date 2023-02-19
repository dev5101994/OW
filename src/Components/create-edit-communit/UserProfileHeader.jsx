import {
  Avatar,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import React, { useEffect } from "react";
import { cameraIcon, editIcon } from "../../utils/svg.file";
import { styled } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SelectBox from "../selectbox";
import Editicon from "../../Assets/images/editicon.png";
import moment from "moment";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import './index.css';
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const SwitchBox = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 15,
    height: 15,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const UserProfileHeader = (props) => {
  const [fileselect, setFileselect] = React.useState("");
  const [imgprofile, setImgprofile] = React.useState("");
  const [Categoryid, setCatgoryid] = React.useState("");
  const [diss, setDiss] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [imageFile, setImageFile] = React.useState(null);
  let update_date = localStorage.getItem("update_date");

  const date_update = moment(update_date).format(" D MMMM YYYY");

  // _____________img croprer________
  const [fileList, setFileList] = React.useState([]);
  // const onChange = ({ fileList }) => {
  //   setFileList(fileList);
  //   setImgprofile(fileList[0].originFileObj);
  //   props.APICALL({ profile: fileList[0].originFileObj });

  //   console.log(fileList[0].originFileObj, "jain");
  // };

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

  const [isEditing, setIsEditing] = React.useState({
    title: false,
    subTitle: false,
    desc: false,
  });

  const [details, setDetails] = React.useState({
    title: "my community",
    subTitle: "",
    desc: "community Category",
  });
  const getcategory = (data) => {
    setCatgoryid(data);
  };
  const Callapi = (data) => {
    props.APICALL(Categoryid);
  };
  const handleChangeDetails = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleEditing = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field],
    });
  };

  const fileupload = (e) => {
    var reader = new FileReader();

    reader.onloadend = function() {
      setFileselect(reader.result);
      setImgprofile(e.target.files[0]);
      props.APICALL({ profile: e.target.files[0] });
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  useEffect(() => {
    props.getcategoryid(Categoryid, details, diss, imgprofile);
  }, [Categoryid, details, diss, imgprofile]);

  const onChange = ({ fileList }) => {
    setUploading(true);
    setImageFile(fileList);
  };
  React.useEffect(() => {
    if (uploading && imageFile) {
      setFileList(imageFile);
      setImgprofile(imageFile[0].originFileObj);
      props.APICALL({ profile: imageFile[0].originFileObj });

      console.log(imageFile[0].originFileObj, "jainssads");
    }
    setImageFile(null);
    setUploading(false);
  }, [uploading, imageFile]);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={24} sm={9} md={9}>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
            >
              {/* {fileselect ? ( */}
              <div className="update-img-icon">
                <ImgCrop rotate shape="round" className="usericonbox-edit">
                  <Upload
                    // action="https://digimonk.co/overwritedev/public/images/communityimgs/"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && " + upload"}
                  </Upload>
                </ImgCrop>
              </div>

              <div className="user-title">
                <h5>
                  {isEditing.title ? (
                    <Stack direction="row" spacing={1}>
                      <input
                        className="edit-field"
                        name="title"
                        onChange={handleChangeDetails}
                        value={details.title}
                        onBlur={props.APICALL}
                        placeholder="Community title"
                      />
                    </Stack>
                  ) : (
                    <>
                      {details.title}
                      <IconButton
                        size="small"
                        onClick={() => handleToggleEditing("title")}
                      >
                        {editIcon}
                      </IconButton>
                    </>
                  )}
                </h5>

                <p>
                  {isEditing.subTitle ? (
                    <>
                      <Stack direction="row" spacing={1}>
                        <input
                          className="edit-field"
                          name="subTitle"
                          onChange={handleChangeDetails}
                          value={details.subTitle}
                          onBlur={props.APICALL}
                          placeholder="@communityhandle"
                        />
                        {/* <button
                          className="saveBtn"
                          onClick={() => handleToggleEditing("subTitle")}
                        >
                          save
                        </button> */}
                      </Stack>
                    </>
                  ) : (
                    <>
                      {details.subTitle}
                      <IconButton
                        size="small"
                        onClick={() => handleToggleEditing("subTitle")}
                      >
                        {editIcon}
                      </IconButton>
                    </>
                  )}
                </p>
                <span className="d-block mt-2">
                  {isEditing.desc ? (
                    <>
                      {/* <Stack direction="row" spacing={1}>
                        <input
                          className="edit-field"
                          name="desc"
                          onChange={handleChangeDetails}
                          value={details.desc}
                        />
                        <button
                          className="saveBtn"
                          onClick={() => handleToggleEditing("desc")}
                        >
                          save
                        </button>
                      </Stack> */}
                      <SelectBox getcategory={getcategory} Callapi={Callapi} />
                    </>
                  ) : (
                    <>
                      {details.desc}
                      <IconButton
                        size="small"
                        onClick={() => handleToggleEditing("desc")}
                      >
                        {editIcon}
                      </IconButton>
                    </>
                  )}
                </span>
                {update_date ? (
                  <div className="show-date">
                    <CalendarMonthIcon
                      className="me-2"
                      sx={{ fontSize: "14px" }}
                    />
                    Created on {date_update}
                  </div>
                ) : null}
              </div>
            </Stack>
          </Grid>
          <Grid item xs={24} sm={3} md={2}>
            <div className="discussion mb-3">
              Discussion{" "}
              <SwitchBox
                {...label}
                onChange={(e) => {
                  setDiss(e.target.checked);
                }}
                onBlur={props.APICALL}
              />
              {/* <span>1</span> */}
            </div>
            <Stack direction="row" spacing={2}>
              <div className="member-count">
                <h1>00</h1>
                <p>Member</p>
              </div>
              <div className="member-count">
                <h1>00</h1>
                <p>Online</p>
              </div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default UserProfileHeader;
