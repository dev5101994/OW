import React, { useEffect } from "react";
import Headers from "../Layouts/Headers";
import "../../Assets/Css/dashboard.css";
import Profile from "../../Assets/images/placeholder.png";
import Editicon from "../../Assets/images/editicon.png";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Base_URL,
  COMMUNITYBIGIMG_URL,
  PROFILEIMG_URL,
} from "../../utils/serverUrl";
const Editprofile = () => {
  let navigate = useNavigate();
  const [profiledata, setProfiledata] = React.useState([]);
  const [profileusername, setProfileusername] = React.useState("");
  const [profilename, setProfilename] = React.useState("");
  const [profilebio, setProfilebio] = React.useState("");
  const [profileemail, setProfileemail] = React.useState("");
  const [profilephone, setProfilephone] = React.useState("");
  const [profiletwitter, setProfiletwitter] = React.useState("");
  const [profilelinkedin, setProfilelinkedin] = React.useState("");
  const [profileinstagram, setProfileinstagram] = React.useState("");
  const [profilefacebook, setProfilefacebook] = React.useState("");
  const [profiletiktok, setProfiletiktok] = React.useState("");
  const [profilepassword, setProfilepassword] = React.useState("");
  const [fileselect, setFileselect] = React.useState();
  const [imgprofile, setImgprofile] = React.useState();
  const [updateimgprofile, setUpdateImgprofile] = React.useState();

  let token = localStorage.getItem("userToken");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");
  const showprofile = () => {
    var config = {
      method: "post",
      url: `${Base_URL}user-details`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        setProfiledata(response.data.success);
        setProfileusername(response.data.success.user_name);
        setProfilename(response.data.success.name);
        setProfilebio(response.data.success.bio);
        setProfileemail(response.data.success.email);
        setProfilephone(response.data.success.phone);
        setProfiletwitter(response.data.success.twitter);
        setProfilelinkedin(response.data.success.linkedin);
        setProfileinstagram(response.data.success.instagram);
        setProfilefacebook(response.data.success.facebook);
        setProfiletiktok(response.data.success.tiktok);
        setImgprofile(response.data.success.image);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const updateprofile = () => {
    var data = new FormData();
    data.append("name", profilename);
    data.append("password", profilepassword);
    data.append("c_password", profilepassword);
    data.append("bio", profilebio);
    data.append("phone", profilephone);
    data.append("image", updateimgprofile);
    data.append("tiktok", profiletiktok);
    data.append("twitter", profiletwitter);
    data.append("linkedin", profilelinkedin);
    data.append("instagram", profileinstagram);
    data.append("facebook", profilefacebook);

    var config = {
      method: "post",
      url: `${Base_URL}updateDetails`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        navigate("/profile");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showprofile();
  }, []);
  const fileupload = (e) => {
    var reader = new FileReader();

    reader.onloadend = function() {
      setFileselect(reader.result);
      setUpdateImgprofile(e.target.files[0]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  console.log(profilephone, "immmmmmm");
  return (
    <>
      <div className="profile_edit_background">
        <div>
          <Headers />
        </div>
        <div className="container">
          <div className="profileedit_start">
            <div className="Profile_edit_header">Profile Settings</div>
          </div>
          <div className="Edit_profile_formpage">
            <div
              className="edit_profile_box"
              // style={{ backgroundImage: `url(${imgprofile})` }}
            >
              <img
                src={
                  updateimgprofile
                    ? fileselect
                    : `${PROFILEIMG_URL}${imgprofile}`
                }
                // {Profile}
                alt="img"
                className="edit_profile_user"
              />
              <span className="editprofile_editicon">
                <input
                  className="edit_profile_input "
                  onChange={fileupload}
                  accept="image/*"
                  type="file"
                />
                <img
                  src={Editicon}
                  alt="editicon"
                  className="edit_icon_profile"
                />
              </span>
            </div>
            <div className="edit_profile_form_page ">
              <form>
                <div class="mb-3">
                  <label
                    for="exampleInputText"
                    class="form-label edit_profile_lebal"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control edit_profile_input_area"
                    id="exampleInputText"
                    aria-describedby="emailHelp"
                    placeholder="@anderson34"
                    value={profileusername}
                    readOnly
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="exampleInputtext"
                    class="form-label edit_profile_lebal"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    class="form-control edit_profile_input_area"
                    id="exampleInputtext"
                    placeholder="Anderson smith"
                    defaultValue={profilename}
                    onChange={(e) => setProfilename(e.target.value)}
                  />
                </div>

                <div class="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label edit_profile_lebal"
                  >
                    Bio
                  </label>
                  <textarea
                    class="form-control edit_profile_input_area"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    defaultValue={profilebio}
                    onChange={(e) => setProfilebio(e.target.value)}
                  ></textarea>
                </div>
                <div className="row">
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputText"
                      class="form-label edit_profile_lebal"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control edit_profile_input_area"
                      id="exampleInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Anderson@smith.com"
                      value={profileemail}
                      readOnly
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputtext"
                      class="form-label edit_profile_lebal"
                    >
                      Phone number
                    </label>
                    <input
                      type="number"
                      class="form-control edit_profile_input_area"
                      id="exampleInputnumber"
                      placeholder="+1 9999999999"
                      defaultValue={profilephone}
                      onChange={(e) => setProfilephone(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputText"
                      class="form-label edit_profile_lebal"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control edit_profile_input_area"
                      id="exampleInputPassword"
                      aria-describedby="emailHelp"
                      placeholder=""
                      onChange={(e) => setProfilepassword(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputtext"
                      class="form-label edit_profile_lebal"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      class="form-control edit_profile_input_area"
                      id="exampleInputpassword"
                      placeholder=""
                      onChange={(e) => setProfilepassword(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputText"
                      class="form-label edit_profile_lebal"
                    >
                      Facebook
                    </label>
                    <input
                      type="text"
                      class="form-control edit_profile_input_area"
                      id="exampleInputText"
                      aria-describedby="emailHelp"
                      placeholder="https:\\facebok.com"
                      defaultValue={profilefacebook}
                      onChange={(e) => setProfilefacebook(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputtext"
                      class="form-label edit_profile_lebal"
                    >
                      Twitter
                    </label>
                    <input
                      type="text"
                      class="form-control edit_profile_input_area"
                      id="exampleInputtext"
                      placeholder="https:\\twitter.com"
                      defaultValue={profiletwitter}
                      onChange={(e) => setProfiletwitter(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputText"
                      class="form-label edit_profile_lebal"
                    >
                      Instagram
                    </label>
                    <input
                      type="text"
                      class="form-control edit_profile_input_area"
                      id="exampleInputText"
                      aria-describedby="emailHelp"
                      placeholder="https:\\instagram.com"
                      defaultValue={profileinstagram}
                      onChange={(e) => setProfileinstagram(e.target.value)}
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="exampleInputtext"
                      class="form-label edit_profile_lebal"
                    >
                      Tiktok
                    </label>
                    <input
                      type="text"
                      class="form-control edit_profile_input_area"
                      id="exampleInputtext"
                      placeholder="https:\\Tiktok.com"
                      defaultValue={profiletiktok}
                      onChange={(e) => setProfiletiktok(e.target.value)}
                    />
                  </div>
                  <div class="mb-5 col-lg-6">
                    <label
                      for="exampleInputtext"
                      class="form-label edit_profile_lebal"
                    >
                      Linkedin
                    </label>
                    <input
                      type="text"
                      class="form-control edit_profile_input_area"
                      id="exampleInputtext"
                      placeholder="https:\\Linkedin.com"
                      defaultValue={profilelinkedin}
                      onChange={(e) => setProfilelinkedin(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="text-center">
                <Button
                  className="mb-5 editprofile_savebutton"
                  onClick={updateprofile}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
