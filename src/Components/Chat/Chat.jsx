import React, { useEffect } from "react";
import Chatimage from "../../Assets/images/image-8.png";
import Image9 from "../../Assets/images/image 9.png";
import Avatar from "../../Assets/images/avatar.png";
import Image6 from "../../Assets/images/image 6.png";
import Emoji from "../../Assets/images/Emoji.png";
import { Link } from "react-router-dom";
import "./Chat.css";
import { BsSearch } from "react-icons/bs";
import { BiSmile } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GrAttachment } from "react-icons/gr";
import Headers from "../Layouts/Headers";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import {
  Base_URL,
  PROFILEIMG_URL,
  Socketurl,
  CHATIMG_URL,
} from "../../utils/serverUrl";
import axios from "axios";
import socketIo from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useRef } from "react";

const Chat = () => {
  const [emoji, setEmoji] = useState(false);
  const [emojidata, setEmojidata] = useState();
  const [users, setUsersData] = useState([]);
  const [chatdeatils, setUserchatDetails] = useState([]);
  const [usersentdetails, setUsersentDetails] = useState();
  const [selectuserprofile, setSelectUserProfile] = useState();
  const [chatmessages, setChatmessage] = useState();
  const [searchItem, setSearchedItem] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [userSelectedId, setUserSelectedId] = useState("");
  let tokenId = localStorage.getItem("userToken");
  let userId = localStorage.getItem("userId");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const [updateimgprofile, setUpdateImgprofile] = React.useState();
  const clickEmoji = async () => {
    setEmoji(!emoji);
  };
  const alluser = () => {
    var config = {
      method: "get",
      url: `${Base_URL}allusers`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.data,'hhhhhhhhhh')
        setUsersData(response.data.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const searchUsers = (value) => {
    setSearchedItem(value);
  };
  const historychat = (id) => {
    const found = users.find((obj) => {
      return obj.id === id;
    });

    setSelectUserProfile(found);
    var data = new FormData();
    data.append("sender", id);
    data.append("receiver", userId);

    var config = {
      method: "post",
      url: `${Base_URL}chathistory`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.data, "history");
        // console.log(userId, "sender");
        // console.log(selectuserprofile?.id, "reciver");
        setUserchatDetails(response.data.data);
        setUsersentDetails(response.data.user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const userprofile = (id) => {
  //   const found = users.find((obj) => {
  //     return obj.id === id;
  //   });

  //   setSelectUserProfile(found);
  //   historychat();
  // };

  const fileupload = (e) => {
    var reader = new FileReader();

    reader.onloadend = function () {
      // setFileselect(reader.result);

      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setUpdateImgprofile(reader.result);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }

      var file = e.target.files[0];
      getBase64(file);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  console.log(updateimgprofile, "inagesbhnbs");
  const chatmessage = () => {
    const socketPayload = {
      receiver: `${selectuserprofile?.id}`,
      message: chatmessages,
      images: updateimgprofile,
      sender: userId,
      token: isLoggedIn,
    };
    socket.emit("message", socketPayload);
    historychat(userSelectedId);
    setUserchatDetails([...chatdeatils, socketPayload]);
    setChatmessage("");
    setUpdateImgprofile("");
    console.log({ socketPayload });
  };
  useEffect(() => {
    alluser();
  }, []);

  const socket = socketIo("https://clubmall.digitalmonkindia.com:1658", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected!!!", socket);
    });
    socket.on("sendMessage", (data) => {
      // console.log("helloooooooo");
      // console.log(data, "test");
      setUserchatDetails((prev) => [...prev, data.data]);
      // console.log(data.data, "dataS");
      // chatdeatils.push(data.data)
    });
    socket.emit("addUser", userId);
    socket.on("connect_error", (err) => {
      console.log("socket connect failed!!", err.message);
      socket.connect();
    });
  }, []);

  // console.log("filter users --- ", typeof userId);

  // useEffect (()=>{

  // },[chatdeatils])

  return (
    <>
      <Headers />
      {loading ? (
        <div className="chat_main">
          <div className="container main_main">
            <div className=" search_messages">
              <span className="messages_text">Messages</span>
            </div>
            <div className="row search-area">
              <div className="col-lg-4 ">
                <div class="input-group input-group-lg">
                  <span class="input-group-text" id="inputGroup-sizing-lg">
                    <BsSearch className="chat_icon_size" />
                  </span>
                  <input
                    type="text"
                    class="form-control chat-input"
                    placeholder="search..."
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-lg"
                    onChange={(e) => searchUsers(e.target.value)}
                  />
                </div>

                <div className="chat-user-community-loop">
                  <div className="chat1  ">
                    <>
                      <PerfectScrollbar>
                        {users
                          .filter((entry) => entry.name.includes(searchItem))
                          .filter((el) => Number(el.id) !== Number(userId))
                          ?.map((item) => (
                            <>
                              <div
                                className={`chat_user_community_card_loop ${item.active}`}
                                onClick={() => {
                                  historychat(item.id);
                                  setUserSelectedId(item.id);
                                }}
                              >
                                <div>
                                  <img
                                    src={
                                      item.image
                                        ? `${PROFILEIMG_URL}${item.image}`
                                        : Avatar
                                    }
                                    // src={
                                    //   communitydata.banner_image
                                    //     ? `${COMMUNITYBIGIMG_URL}${communitydata.banner_image}`
                                    //     : Imagedetail
                                    // }
                                    alt="chat"
                                    className="chat_image_card"
                                  />
                                </div>
                                <div className="chat_user_community_text_card">
                                  <p className="chat_user_community_text_name_card">
                                    {item.name}
                                    <span>-</span>
                                    <span className="chat_user_community_text_mail_card">
                                      {item.user_name}
                                    </span>
                                  </p>
                                  <p className="chat_user_community_text_discreption">
                                    {item.description}
                                  </p>
                                </div>
                                <p className="chat_user_community_text_time_card">
                                  {item.time}
                                </p>
                              </div>
                            </>
                          ))}
                      </PerfectScrollbar>
                    </>
                  </div>
                </div>
              </div>
              {/* {selectuserprofile ? (
              <> */}
              <div className="col-lg-8">
                <div className="chat_user_community">
                  <div>
                    <img
                      src={
                        selectuserprofile?.image
                          ? `${PROFILEIMG_URL}${selectuserprofile?.image}`
                          : Avatar
                      }
                      // {
                      //   item.image
                      //     ? `${PROFILEIMG_URL}${item.image}`
                      //     : Avatar
                      // }
                      alt="chat"
                      className="chat_image"
                    />
                  </div>

                  <div className="chat_user_community_text">
                    <p className="chat_user_community_text_name">
                      {selectuserprofile?.name}
                    </p>
                    <p className="chat_user_community_text_mail">
                      @{selectuserprofile?.user_name}
                    </p>
                  </div>
                </div>

                <div className="chat-user-community-loop">
                  <div className="chat_room">
                    <div className="chat_roomscroll">
                      <PerfectScrollbar>
                        {chatdeatils.map((item) => (
                          <>
                            <h1 className="chat_room_date">
                              <span className="chat_date">
                                {moment(item.created_at)
                                  .startOf("hour")
                                  .fromNow()}
                              </span>
                            </h1>
                            <div>
                              {selectuserprofile?.id == item?.sender_id ? (
                                <>
                                  {" "}
                                  <div className="chat_user_community_chatbox">
                                    <div>
                                      <img
                                        src={
                                          selectuserprofile?.image
                                            ? `${PROFILEIMG_URL}${selectuserprofile?.image}`
                                            : Avatar
                                        }
                                        alt="chat"
                                        className="chat_image"
                                      />
                                    </div>
                                    <div className="chat_user_community_text">
                                      <p className="chat_user_community_text_name_chatbox">
                                        test
                                      </p>
                                      {item.status == 0 ? (
                                        <p className="chat_user_community_text_mail_chatbox_right">
                                          {item?.message}
                                        </p>
                                      ) : (
                                        <img
                                          src={`${CHATIMG_URL}${item?.message}`}
                                          alt="chat"
                                          className="chat_image"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="chat_user_community_chatbox_right">
                                    <div className="chat_user_community_text_right">
                                      <p className="chat_user_community_text_name_chatbox_right">
                                        {selectuserprofile?.name}
                                      </p>
                                      {item.status == 0 ? (
                                        <p className="chat_user_community_text_mail_chatbox_right">
                                          {item?.message}
                                        </p>
                                      ) : (
                                        <img
                                          src={`${CHATIMG_URL}${item?.message}`}
                                          alt="chat"
                                          className="chat_image"
                                        />
                                      )}
                                    </div>
                                    <div>
                                      <img
                                        src={
                                          selectuserprofile?.image
                                            ? `${PROFILEIMG_URL}${selectuserprofile?.image}`
                                            : Avatar
                                        }
                                        alt="chat"
                                        className="chat_image_right"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                              {/* {userId == item.sender_id ? (
                              
                            ) : null} */}
                            </div>
                          </>
                        ))}
                      </PerfectScrollbar>
                    </div>

                    <div className="chatbox-box">
                      <div className="chatbox-box_textarea">
                        {emoji ? (
                          <>
                            <div>
                              <EmojiPicker
                                onEmojiClick={(data) =>
                                  setEmojidata(data.emoji)
                                }
                              />
                            </div>
                          </>
                        ) : null}
                        <input
                          // defaultValue={emojidata}
                          type="text"
                          placeholder="Write a message..."
                          className="chatbox-box_input"
                          value={chatmessages}
                          onChange={(e) => setChatmessage(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && chatmessage()}
                        />
                        {/* <BiSmile className="chat_smile" onClick={clickEmoji} /> */}
                        <GrAttachment className="chat_Attachment" />
                        <div className="position-relative inputFile">
                          <input
                            onChange={fileupload}
                            accept="image/*"
                            type="file"
                          />
                        </div>

                        <FiSend className="chat_Send" onClick={chatmessage} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </>
              ) : null} */}
            </div>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 93px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Chat;
