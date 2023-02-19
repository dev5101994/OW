import React, { useEffect } from "react";
import "../../Assets/Css/communitydetailpage.css";
import Headers from "../../Components/Layouts/Headers";
import Footer from "../../Components/Layouts/Footer";
import Imagedetail from "../../Assets/images/communitydetailpage.png";
import { Button, Card, Container, Nav, Stack, Tab } from "react-bootstrap";
import Image8 from "../../Assets/images/image-8.png";
import { addCalender, journalismAdd, plusIcon } from "../../utils/svg.file";
import Rectangle8 from "../../Assets/images/rectangle 1508.png";
import Rectangle10 from "../../Assets/images/rectangle 1510.png";
import Rectangle11 from "../../Assets/images/rectangle 1511.png";
import Rectangle9 from "../../Assets/images/rectangle1509.png";
import SlickSlide from "../../Components/SlickSlide";
import TextEditor from "../editor/TextEditor";
import ApprovedChapter from "./ApprovedChapter";
import Community6 from "./Community6";
import Community7 from "./Community7";
import Community8 from "./Community8";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import {
  Base_URL,
  COMMUNITYBIGIMG_URL,
  COMMUNITYSMALLIMG_URL,
  img_URL,
  PROFILEIMG_URL,
} from "../../utils/serverUrl";
import moment from "moment";
import EditChapter from "../create-edit-communit/modal/editchapter";
import { useState } from "react";
import ViewModal from "../create-edit-communit/modal";
import RemoveChapter from "../create-edit-communit/modal/remove-chapter";
import AddChapter from "../create-edit-communit/modal/add-chapter";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const CommunityDetailPage = (props) => {
  const [isCommunity, setIsCommunity] = React.useState(false);
  const [communitydata, setCommunitydata] = React.useState([]);
  const [communitycat, setCommunitycat] = React.useState([]);
  const [communityact, setCommunityact] = React.useState([]);
  const [communitymember, setCommunitymember] = React.useState([]);
  const [discussiondetail, setDiscussiondetail] = React.useState([]);
  const [isViewAll, setIsViewAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [chapterid, setChapterId] = React.useState("");
  const [fileselect, setFileselect] = React.useState("");
  const [imghome, setImghome] = React.useState("");
  const [inputRef, setInputRef] = React.useState(false);
  const [inputRef2, setInputRef2] = React.useState(false);
  const [inputRef3, setInputRef3] = React.useState(false);
  const [age, setAge] = React.useState("Select Category");
  const [user, setUser] = React.useState("Select Category");
  const [imghome2, setImghome2] = React.useState("");
  // const [imghome,setImghome]= React.useState("");
  const [pendingchapters, setPendingchapter] = React.useState([]);

  const params = useParams();
  const community_id = params.id;
  localStorage.setItem("community_id", community_id);

  let token = localStorage.getItem("userToken");
  let userId = localStorage.getItem("userId");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  let act_id = localStorage?.getItem("act_id");

  const [open, setOpen] = React.useState();

  const handleClickOpen = (type, id) => {
    setOpen(type);
    // console.log({ id }, "iiidddd");
    if (id) {
      setChapterId(id);
    }
  };
  const handleClose = () => {
    setOpen(false);
    console.log("its complete ", open);
  };

  const showdiscussion = () => {
    // console.log(community_id, "community id");
    var data = new FormData();
    data.append("community_id", community_id);

    var config = {
      method: "post",
      url: `${Base_URL}showdiscussion`,

      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data.data, "show discussion detail");

        setDiscussiondetail(response.data.data);
        const date_current = moment().format(" D MMMM YYYY");
        const date1 = moment(setDiscussiondetail.created_at).format(
          " D MMMM YYYY"
        );
        let subtract = date_current.subtract(date1);
        let format = moment(subtract).format("D MMMM YYYY");
        // console.log(format, "show ");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const setcommunity = () => {
    var data = new FormData();
    data.append("id", params.id);

    var config = {
      method: "post",
      url: `${Base_URL}showcommunitydetails`,

      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data, "testtdsdsa");
        setCommunitydata(response.data.data);
        setCommunityact(response.data.act);
        setCommunitycat(response.data.cat_name?.id);
        setCommunitymember(response.data.member);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const onhandleCommunity = (actId) => {
    // console.log(actId, "actid");
    localStorage.setItem("act_id", actId);
    setIsCommunity(!isCommunity);
  };
  const communitydetailpage = [
    {
      images: Rectangle8,
      name: "Dr Cameron Williamson",
      title: "Creator",
    },
    {
      images: Rectangle9,
      name: "Dianne Russell",
      title: "Founder",
    },
    {
      images: Rectangle10,
      name: "Ralph Edwards",
      title: "Member",
    },
    {
      images: Rectangle11,
      name: "Savannah Nguyen",
      title: "Creator",
    },
  ];
  useEffect(() => {
    setcommunity();
    showdiscussion();
  }, []);
  const date_update = moment(communitydata.created_at).format(" D MMMM YYYY");
  // _____________img croprer________
  const [fileList, setFileList] = React.useState([]);
  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        // name: communitydata.image,
        // status: "done",
        url: `https://digimonk.co/overwritedev/public/images/communityimgs/${communitydata.image}`,
      },
    ]);
  }, [communitydata]);
  const onChange = ({ fileList }) => {
    console.log(fileList, "imgpro");
    setFileList(fileList);
    setImghome(fileList[0]?.originFileObj);

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
  const [fileList2, setFileList2] = React.useState([]);
  useEffect(() => {
    setFileList2([
      {
        uid: "-1",
        // name: communitydata.image,
        // status: "done",
        url: communitydata.banner_image
          ? `${COMMUNITYBIGIMG_URL}${communitydata.banner_image}`
          : Imagedetail,
      },
    ]);
  }, [communitydata]);
  const onChange2 = ({ fileList }) => {
    // console.log(fileList, "img");
    setFileList2(fileList || []);

    setImghome2(fileList[0]?.originFileObj);
    // setFileList2(fileList2);
    // setImghome2(fileList2[0].originFileObj);

    // console.log(fileList[0].originFileObj, "jain");
  };

  const onPreview2 = async (file) => {
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
  const editcommunity = () => {
    var data = new FormData();
    data.append("community_id", params.id);
    data.append("image", imghome);
    data.append("banner_image", imghome2);
    data.append("title", communitydata.title);
    data.append("category_id", communitycat);
    data.append("about", communitydata.about);
    data.append("discussion", "1");
    data.append("community_handle", communitydata.community_handle);

    var config = {
      method: "post",
      url: `${Base_URL}update-community`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },

      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data, "testtdsdsa");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    editcommunity();
  }, [
    imghome,
    imghome2,
    params.id,
    communitydata.title,
    communitycat,
    communitydata.about,
    communitydata.community_handle,
  ]);

  const fetchData = async () => {
    var config = {
      method: "get",
      url: `${Base_URL}allcategory`,
    };

    axios(config)
      .then(function(response) {
        setUser(response.data.data);
        // console.log("details", response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [age]);
  const handleChange = (event) => {
    setAge(event.target.value);
    setCommunitycat(event.target.value);

    // console.log("ebzsdb");
  };

  const pendingchapter = () => {
    var data = new FormData();
    data.append("community_id", community_id);
    data.append("act_id", act_id);

    var config = {
      method: "post",
      url: `${Base_URL}chapterpending-list`,

      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.data, "chapter value in detail page ");
        setPendingchapter(response.data.data);
        // setUsername(response.data.name);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    pendingchapter();
    // showcount();
  }, [isSubmitting, act_id]);

  return (
    <>
      <Headers />
      <div className="headingCommunity">
        <ImgCrop shape>
          <Upload
            action="https://digimonk.co/overwritedev/public/images/communityimgs/"
            listType="picture-card"
            fileList={fileList2}
            onChange={onChange2}
            onPreview={onPreview2}
          >
            {fileList2?.length < 1 && "+ upload"}
          </Upload>
        </ImgCrop>
        {/* <img
          src={
            communitydata.banner_image
              ? `${COMMUNITYBIGIMG_URL}${communitydata.banner_image}`
              : Imagedetail
          }
          className="w-100"
        /> */}
      </div>
      <section>
        <Container>
          <div className="community_stack">
            <Stack direction="horizontal" className="py-3" gap={3}>
              <div className="rotateImg">
                <ImgCrop rotate>
                  <Upload
                    // action="https://digimonk.co/overwritedev/public/images/communityimgs/"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && "+ upload "}
                  </Upload>
                </ImgCrop>
                {/* <img
                  src={
                    communitydata.image
                      ? `${COMMUNITYSMALLIMG_URL}${communitydata.image}`
                      : Image8
                  }
                  className="communitydetailpage_img_radius"
                /> */}
              </div>
              <div>
                <div
                  style={{
                    backgroundColor: inputRef ? "#fff" : "transparent",
                    // marginTop: "11.5px",
                    // marginBottom: "11.5px",
                  }}
                  className="communitydetailpage_heading_journalism"
                >
                  <input
                    // disabled={preLoader}
                    onFocus={() => setInputRef(true)}
                    onBlur={() => {
                      setInputRef(false);
                      // createTaskFunc();
                    }}
                    placeholder="This is the title"
                    value={communitydata.title}
                    onChange={(e) =>
                      setCommunitydata((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    type="text"
                    className="communitydetailpage_heading_journalism"
                    // maxLength={100}
                    style={{
                      width: communitydata?.title
                        ? communitydata.title.length + 1 + "ch"
                        : "95%",
                      fontSize: "23px",
                      fontWeight: 700,
                      border: inputRef ? "1px" : "none",
                    }}
                  />
                </div>
                {/* <h2
                  className="communitydetailpage_heading_journalism "
                  contenteditable="true"
                >
                
                  {communitydata.title}
                </h2> */}
                <div
                  style={{
                    backgroundColor: inputRef2 ? "#fff" : "transparent",
                    // marginTop: "11.5px",
                    // marginBottom: "11.5px",
                  }}
                  className="communitydetailpage_heading_journalism_p"
                >
                  <input
                    // disabled={preLoader}
                    onFocus={() => setInputRef2(true)}
                    onBlur={() => {
                      setInputRef2(false);
                      // createTaskFunc();
                    }}
                    placeholder="This is the community_handle"
                    value={communitydata.community_handle}
                    onChange={(e) =>
                      setCommunitydata((prev) => ({
                        ...prev,
                        community_handle: e.target.value,
                      }))
                    }
                    type="text"
                    className="communitydetailpage_heading_journalism_p"
                    maxLength={100}
                    style={{
                      width: communitydata?.community_handle
                        ? communitydata.community_handle.length + 1 + "ch"
                        : "95%",
                      fontSize: "18px",
                      fontWeight: 700,
                      border: inputRef2 ? "1px" : "none",
                    }}
                  />
                </div>
                {/* <p
                  className="communitydetailpage_heading_journalism_p"
                  contenteditable="true"
                >
                
                  {communitydata.community_handle}
                </p> */}
                <div className="d-block align-items-center d-lg-flex ">
                  <FormControl sx={{ minWidth: "100%" }}>
                    {/* <InputLabel id="demo-simple-select-autowidth-label">
          Select Category
        </InputLabel> */}
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      onChange={handleChange}
                      label="Select Category"
                      value={communitycat}

                      // onBlur={props.Callapi}
                      // onBlur={() => props.Callapi}
                    >
                      {Object.values(user).map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {/* <span className="communitydetailpage_Journalism_text">
                    {communitycat}
                  </span> */}
                  {isLoggedIn ? (
                    <>
                      {Number(communitydata.user_id) === Number(userId) ? (
                        <>
                          <Button
                            variant="success"
                            className="communitydetailpage_button_journalism mx-auto mx-0"
                            disabled
                          >
                            Joined
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="success"
                          className="communitydetailpage_button_journalism"
                        >
                          Join Now
                          <span className="communitydetailpage_addsign_button">
                            {journalismAdd}
                          </span>
                        </Button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="ms-auto align-items-center">
                <div className="d-flex justify-content-end">
                  <i className="communitydetailpage_date_calender">
                    {addCalender}
                  </i>
                  <p className="communitydetailpage_date_text">
                    created on
                    <span className="communitydetailpage_date_date">
                      {/* 25 Aug 2022 */}
                      {date_update}
                    </span>
                  </p>
                </div>
                <div className="d-flex">
                  <Button className="communitydetailpage_members_button">
                    {communitymember}
                    <p className="communitydetailpage_members_text">Members</p>
                  </Button>
                  <Button className="communitydetailpage_members_button">
                    00{" "}
                    <p className="communitydetailpage_members_text">Online</p>
                  </Button>
                </div>
              </div>
            </Stack>
          </div>
        </Container>
      </section>

      <section>
        <div className="community_detail_page ">
          <Container>
            <div className="pt-4">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="community_detail_page_back h-100">
                    <h2 className="community_detail_page_heading">
                      About Community
                    </h2>
                    <hr />
                    <div
                      style={{
                        backgroundColor: inputRef3 ? "#fff" : "transparent",
                        // marginTop: "11.5px",
                        // marginBottom: "11.5px",
                      }}
                      className="community_detail_page_description"
                    >
                      <input
                        // disabled={preLoader}
                        onFocus={() => setInputRef3(true)}
                        onBlur={() => {
                          setInputRef3(false);
                          // createTaskFunc();
                        }}
                        placeholder="This is the about"
                        value={communitydata.about}
                        onChange={(e) =>
                          setCommunitydata((prev) => ({
                            ...prev,
                            about: e.target.value,
                          }))
                        }
                        type="text"
                        // className="community_detail_page_description"
                        maxLength={100}
                        style={{
                          width: communitydata?.about
                            ? communitydata.about.length + 1 + "ch"
                            : "100%",
                          fontSize: "18px",
                          fontWeight: 700,
                          border: inputRef3 ? "1px" : "none",
                        }}
                      />
                    </div>
                    {/* <p
                      className="community_detail_page_description"
                      contenteditable="true"
                    >
                      {communitydata.about}
                    </p> */}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="community_detail_page_back h-100 mobiletop-15">
                    <h2 className="community_detail_page_heading">
                      About Community
                    </h2>
                    <hr />
                    {communitydetailpage.map((item) => (
                      <Stack gap={3} direction="horizontal" className="py-2">
                        <div className="ms-3">
                          <img src={item.images} alt="" />
                        </div>
                        <div className="">
                          <h3 className="community_detail_page_names">
                            {item.name}
                          </h3>
                          <p className="m-0 community_detail_page_title">
                            {item.title}
                          </p>
                        </div>
                      </Stack>
                    ))}
                    <p className="ms-3 py-2">
                      <a href="#" className="community_detail_page_anchor">
                        View all members
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section>
        <div className="community_detail_page">
          <Container className="ps-3">
            <h1 className="community_detail_page_heading_1 mb-3 pt-3">
              <span className="community_detail_page_heading_1_span">
                Community Discussion board
              </span>
            </h1>

            <div className="border-0">
              {isLoggedIn ? (
                communitydata.discussion === 1 ? (
                  <>
                    <TextEditor community_id={community_id} />
                  </>
                ) : null
              ) : null}
            </div>
            {discussiondetail.map((item, index) => {
              if (index > 2 && !isViewAll) {
                return;
              }

              return (
                <div>
                  <Stack direction="horizontal" className="py-3" gap={3}>
                    <div>
                      <img
                        src={`${PROFILEIMG_URL}${item.image}`}

                        //  {Rectangle8}
                      />
                    </div>
                    <div>
                      <h5 className="community_detail_page_heading_2">
                        {item.name}.
                        <span className="community_detail_page_heading_2_span">
                          22 hr ago{item.created_at}
                        </span>
                      </h5>
                      <p className="m-0">
                        <a
                          href="#"
                          className="community_detail_page_heading_2_a_user"
                        >
                          @{item.user_name}
                        </a>
                      </p>
                    </div>
                  </Stack>
                  <p
                    className="community_detail_page_heading_2_a"
                    dangerouslySetInnerHTML={{ __html: item.discussion }}
                  ></p>
                  <hr className="bg-secondary" />
                </div>
              );
            })}
          </Container>
          <div className="text-center">
            <Button
              variant="outline"
              className="community_detail_page_button_1"
              onClick={(e) => {
                if (isViewAll) {
                  setIsViewAll(false);
                } else {
                  setIsViewAll(true);
                }
              }}
            >
              View All
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="community_detail_page">
          <h1 className="community_detail_page_heading_1">
            <span className="community_detail_page_heading_1_span">
              Community Acts
            </span>
          </h1>
          <div className="py-5">
            <div className="commity-slider">
              <SlickSlide
                onClick={(actId) => onhandleCommunity(actId)}
                communityact={communityact}
              />
            </div>
          </div>
        </div>
      </section>
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
                    name="Chapter Name"
                    eventButton="50 Events"
                    subitemtext="@user431"
                    url="/owevent"
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Community6
                    isSubmitting={isSubmitting}
                    pendingchapters={pendingchapters}
                    name="Chapter Name"
                    subtext="@user431"
                    url="/owevent"
                  />
                  {isLoggedIn ? (
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

                          <span className="add-member-text">
                            Add New Chapter
                          </span>
                        </Stack>
                      </div>
                    </Container>
                  ) : (
                    ""
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="three">
                  <Community7
                    name="Chapter Name"
                    eventButton="50 Events"
                    subtext="@user431"
                    url="/owevent"
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="four">
                  <Community8 url="/owevent" name="Chapter Name" />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </section>
      ) : null}

      <Footer />
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
            {open === "editchapter" ? (
              <EditChapter
                chapterid={chapterid}
                setIsSubmitting={setIsSubmitting}
                isSubmitting={isSubmitting}
              />
            ) : open === "addchapter" ? (
              <AddChapter
                handleClose={handleClose}
                setIsSubmitting={setIsSubmitting}
                isSubmitting={isSubmitting}
                pendingchapter={pendingchapter}
              />
            ) : open === "removechapter" ? (
              <RemoveChapter
                chapterid={chapterid}
                setIsSubmitting={setIsSubmitting}
                isSubmitting={isSubmitting}
              />
            ) : null}
          </>
        }
      />
    </>
  );
};

export default CommunityDetailPage;
