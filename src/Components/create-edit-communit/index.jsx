import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  cameraIcon,
  editIcon,
  editicons,
  plusIcon,
} from "../../utils/svg.file";
import Headers from "../Layouts/Headers";
import UserProfileHeader from "./UserProfileHeader";
import { styled } from "@mui/material/styles";
import userImg from "../../Assets/images/image-8.png";
import ViewModal from "./modal";
import AddMember from "./modal/add-member";
import AddNewAct from "./modal/add-new-act";
import ActImg from "../../Assets/images/silverfrog.png";
import ApprovedChapter from "../Community-Detail-Page/ApprovedChapter";
import Community6 from "../Community-Detail-Page/Community6";
import Community7 from "../Community-Detail-Page/Community7";
import Community8 from "../Community-Detail-Page/Community8";
import { Container, Nav, Tab } from "react-bootstrap";
import AddChapter from "../create-edit-communit/modal/add-chapter";
import EditChapter from "./modal/editchapter";
import RemoveChapter from "./modal/remove-chapter";
import { useEffect } from "react";
import axios from "axios";
// import { Base_URL } from "../../utils/serverUrl";
import SlickSlide from "../SlickSlide";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Silverfrog from "../../Assets/images/silverfrog.png";
import "../../Assets/Css/communitydetailpage.css";
import upload from "../../Assets/images/upload.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Base_URL,
  COMMUNITYSMALLIMG_URL,
  img_URL,
  PROFILEIMG_URL,
} from "../../utils/serverUrl";
import { useCallback } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";

const CardBox = styled(CardContent)(() => ({
  "&.MuiCardContent-root": {
    minHeight: "300px",
    paddingBottom: "16px",
  },
}));
const Paragraph = styled(Typography)(() => ({
  "&.MuiTypography-root": {
    fontSize: "20px",

    color: "#000",
    fontWeight: "400",
  },
}));

const CreateEdit = (props) => {
  const [fileselect, setFileselect] = React.useState("");
  const [imghome, setImghome] = React.useState("");
  const [textareavalue, setTextareavlaue] = React.useState("");
  const [categoryid, setCategoryid] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [disscusion, setDisscusion] = React.useState("");
  const [profileimg, setProfileimg] = React.useState("");
  const [community_id, setCommunityid] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [actdata, setActdata] = React.useState([]);
  const [showmem, setShowmembers] = React.useState([]);

  const [uploading, setUploading] = React.useState(false);
  const [imageFile, setImageFile] = React.useState(null);

  const user_Id = localStorage.getItem("userId");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");

  let communityId = localStorage.getItem("community_id");
  let commid = communityId?.replace(/^"(.+)"$/, "$1");

  let userId = user_Id?.replace(/^"(.+)"$/, "$1");

  const actlist = () => {
    var data = new FormData();
    data.append("community_id", commid);

    var config = {
      method: "post",
      url: `${Base_URL}act-list`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "teshhagd");
        setActdata(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const showmembers = () => {
    // console.log(invitedata,'gdhhhd')
    var data = new FormData();
    data.append("id", commid);

    var config = {
      method: "post",
      url: `${Base_URL}showmember`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "show members data");
        setShowmembers(response.data.data);
        setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   if (isSubmitting) {
  //     showmembers();
  //   }
  // }, [isSubmitting]);

  const fileupload = (e) => {
    var reader = new FileReader();
    setImghome(e.target.files[0]);
    reader.onloadend = function() {
      setFileselect(reader.result);
      APICALL({ bannerImage: e.target.files[0] });
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const [open, setOpen] = React.useState();

  const handleClickOpen = (type) => {
    setOpen(type);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isCommunity, setIsCommunity] = React.useState(false);

  const onhandleCommunity = (id) => {
    localStorage.setItem("act_id", id);
    setIsCommunity(!isCommunity);
  };
  const getcategoryid = (data, value, item, img, diss) => {
    setCategoryid(data);
    setTitle(value.title);
    setSubtitle(value.subTitle);
    setDisscusion(item);
    setProfileimg(img);
  };
  const APICALL = (value) => {
    var data = new FormData();

    data.append("image", value?.profile || profileimg);
    data.append("banner_image", value?.bannerImage || imghome);
    data.append("title", title);

    data.append("category_id", categoryid || "0");

    data.append("about", textareavalue);
    data.append("discussion", disscusion);
    data.append("community_handle", subtitle);
    data.append("community_id", community_id);
    data.append("user_id", userId);

    var config = {
      method: "post",
      url: `${Base_URL}add-community`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        setCommunityid(response.data.data.id);
        console.log(response.data.data.updated_at, "date");
        localStorage.setItem("community_id", response.data.data.id);
        localStorage.setItem("update_date", response.data.data.updated_at);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const handletextarea = (e) => {
    setTextareavlaue(e.target.value);
    APICALL();
  };

  // const AllValue = [
  //   categoryid,
  //   title,
  //   subtitle,
  //   disscusion,
  //   profileimg,
  //   textareavalue,
  //   imghome,
  // ];
  // console.log(AllValue);
  useEffect(() => {
    if (!isSubmitting) {
      actlist();
      handleClose();
    }
  }, [isSubmitting]);
  useEffect(() => {
    return () => {
      // localStorage.removeItem("community_id");
      localStorage.removeItem("update_date");
    };
  }, []);

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`custom-arrow ${className}`} onClick={onClick}>
        <button>
          <ArrowBackIcon />
        </button>
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`custom-arrow ${className}`} onClick={onClick}>
        <button>
          <ArrowForwardIcon />
        </button>
      </div>
    );
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
    // console.log(fileList, "imgpro");
    setFileList(fileList);
    setImghome(fileList[0]?.originFileObj);
    var reader = new FileReader();

    reader.onloadend = function() {
      setFileselect(reader.result);
    };
    // reader.readAsDataURL(e.target.files[0]);
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
  React.useEffect(() => {
    // if (uploading && imageFile) {
    //   setFileList(imageFile);
    //   // setImghome(imageFile[0].originFileObj);
    // APICALL({ bannerImage: imageFile[0].originFileObj });
    APICALL();

    //   console.log(imageFile[0].originFileObj, "jainssads");
    // }
    // setImageFile(null);
    // setUploading(false);
  }, [imghome]);
  // // _____________________img croper ___________________

  return (
    <>
      <Headers />
      <div className="banner-edit-content-color">
        <div
          className="banner-edit-content"
          style={{
            backgroundImage: `url(${upload})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="editbtn">
            {/* <Button
              component="label"
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                color: "#fff",
                borderColor: "#fff",
                background: "rgba(0, 0, 0, 0.3)",
              }}
            > */}
            {/* <span className="me-2">{editIcon}</span>Edit
              <input
                hidden
                onChange={fileupload}
                accept="image/*"
                multiple
                type="file"
              />
            </Button> */}
          </div>
          {/* {fileselect ? null : ( */}
          <div className="position-relative w-100">
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems={"center"}
            >
              {/* <IconButton
                disableRipple="false"
                aria-label="upload picture"
                component="label"
              > */}
              {/* {cameraIcon} */}
              <div className="editIcon">
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
                <button className="btn btnedits">
                  <span>{editicons}</span>Edit
                </button>
              </div>
            </Stack>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <UserProfileHeader getcategoryid={getcategoryid} APICALL={APICALL} />
      </div>
      <div className="py-4 bg-light-green">
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={8} xs={12}>
              <Card variant="false" className="create-edit-card">
                <h5>About Community</h5>
                <CardBox>
                  <textarea
                    className="textareabox"
                    placeholder="about Community"
                    onChange={handletextarea}
                    onBlur={APICALL}
                  ></textarea>
                </CardBox>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Card variant="false" className="create-edit-card">
                <h5>Community Members</h5>

                <CardBox>
                  {showmem.map((item) => (
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: 50, height: 50 }}
                        src={
                          showmem ? `${PROFILEIMG_URL}${item.image}` : userImg
                        }
                      />
                      <div className="user-edit-text">
                        <h6>{item.name}</h6>
                        <p>
                          <span>@{item.user_name} |</span>
                          {item.role === 2 ? "Founder" : "Member"}
                        </p>
                      </div>
                    </Stack>
                  ))}
                  {community_id ? (
                    <Stack
                      direction="column"
                      spacing={1}
                      className="create-edit-member mt-5"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IconButton
                        onClick={() => handleClickOpen("addmember")}
                        disableRipple="false"
                        sx={{ p: 0 }}
                      >
                        {plusIcon}
                      </IconButton>
                      <span className="add-member-text">
                        Add community members
                      </span>
                    </Stack>
                  ) : (
                    <Stack
                      direction="column"
                      spacing={1}
                      className="create-edit-member mt-5"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <span className="add-member-text">
                        Add community members
                      </span>
                    </Stack>
                  )}
                </CardBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={12}>
              <div className="common-heading mt-lg-3">
                <span>Community Acts</span>
              </div>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                className="mt-lg-5"
              >
                <Grid item lg={9} xs={12}>
                  <div className="commity-slider">
                    <Slider {...settings}>
                      {actdata.map((item, index) => (
                        <Card
                          onClick={() => onhandleCommunity(item.id)}
                          variant="false"
                          sx={{
                            borderRadius: "24px",
                            boxShadow: "0px 9px 20px rgba(167, 167, 167, 0.4)",
                          }}
                          key={index}
                        >
                          <CardMedia
                            component="img"
                            image={`${img_URL}${item.image}`}
                            alt="green iguana"
                          />

                          <div className="p-3 act-content">
                            <h3>{item.act_name}</h3>
                            <p>{item.description}</p>
                          </div>
                        </Card>
                      ))}
                    </Slider>
                  </div>
                </Grid>
                <Grid item lg={3} xs={12}>
                  <div className="add-new-act">
                    {community_id ? (
                      <Stack
                        direction="column"
                        spacing={1}
                        className="create-edit-member"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          onClick={() => handleClickOpen("addnewact")}
                          disableRipple="false"
                          sx={{ p: 0 }}
                        >
                          {plusIcon}
                        </IconButton>
                        <span className="add-member-text">Add New Act</span>
                      </Stack>
                    ) : (
                      <Stack
                        direction="column"
                        spacing={1}
                        className="create-edit-member"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <span className="add-member-text">Add New Act</span>
                      </Stack>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* <div className="py-5"></div> */}
      {isCommunity ? (
        <section>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Container>
              <div className="owevent_button_tab">
                <Nav variant="pills" className="">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Approved Chapter</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Pending Chapter</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="three">Pending Chapter Edits</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="four">Chapter Removal</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Container>
            <div className="ow_event py-5">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ApprovedChapter
                    handleClickOpen={handleClickOpen}
                    isSubmitting={isSubmitting}
                    name="Chapter Name"
                    eventButton="50 Events"
                    subitemtext="@user431"
                    url="/owevent"
                  />
                  <Container>
                    <div className="add-new-act mt-3 min-auto py-5">
                      <Stack
                        direction="column"
                        spacing={1}
                        className="create-edit-member"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {community_id ? (
                          <IconButton
                            onClick={() => handleClickOpen("addchapter")}
                            disableRipple="false"
                            sx={{ p: 0 }}
                          >
                            {plusIcon}
                          </IconButton>
                        ) : (
                          ""
                        )}

                        <span className="add-member-text">Add New Chapter</span>
                      </Stack>
                    </div>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Community6
                    isSubmitting={isSubmitting}
                    name="Chapter Name"
                    subtext="@user431"
                    url="/owevent"
                  />
                  <Container>
                    <div className="add-new-act mt-3 min-auto py-5">
                      <Stack
                        direction="column"
                        spacing={1}
                        className="create-edit-member"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {community_id ? (
                          <IconButton
                            onClick={() => handleClickOpen("addchapter")}
                            disableRipple="false"
                            sx={{ p: 0 }}
                          >
                            {plusIcon}
                          </IconButton>
                        ) : (
                          ""
                        )}

                        <span className="add-member-text">Add New Chapter</span>
                      </Stack>
                    </div>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="three">
                  <Community7
                    name="Chapter Name"
                    eventButton="50 Events"
                    subtext="@user431"
                  />
                  <Container>
                    <div className="add-new-act mt-3 min-auto py-5">
                      <Stack
                        direction="column"
                        spacing={1}
                        className="create-edit-member"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {community_id ? (
                          <IconButton
                            onClick={() => handleClickOpen("addchapter")}
                            disableRipple="false"
                            sx={{ p: 0 }}
                          >
                            {plusIcon}
                          </IconButton>
                        ) : (
                          ""
                        )}

                        <span className="add-member-text">Add New Chapter</span>
                      </Stack>
                    </div>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="four">
                  <Community8 name="Chapter Name" />
                  <Container>
                    <div className="add-new-act mt-3 min-auto py-5">
                      <Stack
                        direction="column"
                        spacing={1}
                        className="create-edit-member"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {community_id ? (
                          <IconButton
                            onClick={() => handleClickOpen("addchapter")}
                            disableRipple="false"
                            sx={{ p: 0 }}
                          >
                            {plusIcon}
                          </IconButton>
                        ) : (
                          ""
                        )}

                        <span className="add-member-text">Add New Chapter</span>
                      </Stack>
                    </div>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </section>
      ) : null}
      <ViewModal
        handleClickOpen={handleClickOpen}
        open={open}
        onCancle={handleClose}
        onSubmit={() => setIsSubmitting(true)}
        title={
          open === "addmember"
            ? "add member"
            : open === "addnewact"
            ? "Add Act"
            : open === "addchapter"
            ? "Add Chapter"
            : open === "editchapter"
            ? "Edit Chapter"
            : open === "removechapter"
            ? "Remover Chapter"
            : null
        }
        cancleText={
          open === "addmember"
            ? "Cancel"
            : open === "addnewact"
            ? "Cancel"
            : open === "addchapter"
            ? "Cancel"
            : open === "editchapter"
            ? "Cancel"
            : open === "removechapter"
            ? "Cancel"
            : null
        }
        submitText={
          open === "addmember"
            ? "Send request"
            : open === "addnewact"
            ? "Add"
            : open === "addchapter"
            ? "Add"
            : open === "editchapter"
            ? "Submit"
            : open === "removechapter"
            ? "Submit"
            : null
        }
        content={
          <>
            {open === "addmember" ? (
              <AddMember
                setIsSubmitting={setIsSubmitting}
                isSubmitting={isSubmitting}
                showmembers={showmembers}
              />
            ) : open === "addnewact" ? (
              <AddNewAct
                setIsSubmitting={setIsSubmitting}
                isSubmitting={isSubmitting}
              />
            ) : open === "addchapter" ? (
              <AddChapter
                setIsSubmitting={setIsSubmitting}
                isSubmitting={isSubmitting}
              />
            ) : open === "editchapter" ? (
              <EditChapter />
            ) : open === "removechapter" ? (
              <RemoveChapter />
            ) : null}
          </>
        }
      />
    </>
  );
};
export default CreateEdit;
