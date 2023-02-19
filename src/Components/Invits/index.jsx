import React, { useState } from "react";
import Headers from "../Layouts/Headers";
import Sent from "../Invits/Sent";
import Recieved from "../Invits/Recieved";
import Joinedrequest from "../Invits/Joinedrequest";
import "../../Assets/Css/dashboard.css";
import { Button } from "react-bootstrap";
import Plus from "../../Assets/images/plus.png";
import ViewModal from "../create-edit-communit/modal";
import AddInvite from "../create-edit-communit/modal/add-invite-member";
import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";

const Invits = (props) => {
  const [HOME_PANEL, setHOME_PANEL] = useState("recieved");
  const [open, setOpen] = React.useState();
  const [invitedata, setData] = React.useState({});
  let token = localStorage.getItem("userToken");
  let user_ids = localStorage.getItem("userId");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");

  const handleClickOpen = (type) => {
    setOpen(type);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitinvite = () => {
    // console.log(invitedata,'gdhhhd')
    var data = new FormData();
    data.append("community_id", invitedata.communityID);
    data.append("sent_user_id", invitedata.usernamesID);
    data.append("user_id", user_ids);
    data.append("role", invitedata.memberID);

    var config = {
      method: "post",
      url: `${Base_URL}joinuser`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "data");
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleHomePanel = (panel) => {
    setHOME_PANEL(panel);
  };

  const handleInviteValueChange = (data) => {
    setData(data);
  };

  return (
    <>
      <div className="invits_backcolor">
        <div>
          <Headers />
        </div>
        <div className="container invits_start">
          <div className="invits_first_heading">
            <div>Invites</div>
            <div>
              <Button
                className="invits_button_member"
                onClick={() => handleClickOpen("addinvite")}
              >
                Invite Member <img src={Plus} alt="plus" className="ms-2" />
              </Button>
            </div>
            {/* {show && <Modal />} */}
          </div>
          <div className="invits_tabs_area">
            <div className="invits-tabs ">
              <Button
                variant="false"
                className={`home-tabs  ${HOME_PANEL === "recieved" ? "home-tabs-active" : ""
                  }`}
                onClick={() => handleHomePanel("recieved")}
              >
                Recieved
              </Button>
              <Button
                variant="false"
                className={`home-tabs  ${HOME_PANEL === "sent" ? "home-tabs-active" : ""
                  }`}
                onClick={() => handleHomePanel("sent")}
              >
                Sent
              </Button>
              <Button
                variant="false"
                className={`home-tabs  ${HOME_PANEL === "joinedrequest" ? "home-tabs-active" : ""
                  }`}
                onClick={() => handleHomePanel("joinedrequest")}
              >
                Joined Request
              </Button>
            </div>
            <hr className="invite_hr" />
            {HOME_PANEL === "recieved" && <Recieved />}
            {HOME_PANEL === "sent" && <Sent />}
            {HOME_PANEL === "joinedrequest" && <Joinedrequest />}
          </div>
        </div>
      </div>
      <ViewModal
        open={open}
        onCancle={handleClose}
        onSubmit={submitinvite}
        title={open === "addinvite" ? "Invite members" : null}
        cancleText={open === "addinvite" ? "Cancel" : null}
        submitText={open === "addinvite" ? "Send request" : null}
        content={
          <>
            {open === "addinvite" ? (
              <AddInvite handleInviteValueChange={handleInviteValueChange} />
            ) : null}
          </>
        }
      />
    </>
  );
};

export default Invits;
