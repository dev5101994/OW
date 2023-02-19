import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../Assets/Css/profile.css";
import axios from "axios";
import { Base_URL } from "../utils/serverUrl";


const Profile = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({})
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {

    
    setErrors({});
    if (e) {
      e.preventDefault();
    }
    const payload = {
      password,
      confirmpassword,
    };
    const errors = {};
    if (!payload.password) {
      errors.password = "Password is required";
    }
    if (!payload.confirmpassword) {
      errors.confirmpassword = "Confirm password is requried";
    }

    if (Object.keys(errors).length) {
      console.log({ errors });
      setErrors(errors);
      return;
    }

    if (payload.password !== payload.confirmpassword) {
      console.log("Password did not match");
      setConfirm("Password did not match");
      return;
    }

   

    var data = new FormData();
    data.append("email", "admin@gmail.com");
    data.append("password", confirmpassword);

    var config = {
      method: "post",
      url: `${Base_URL}resetpassword`,

      data: data,
    };

    axios(config)
      .then(function (response) {
        setMessage('Password Updated Succussfully')
        setPassword('')
        setConfirmPassword('')
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  return (
    <>
      {/* <LoginDashboard /> */}
      <div className="profile_page_profile">
        <div className="row">
          <div className="col-lg-4 offset-4">
            <div className="profile_page">
              <h2 className="profile_heading">Change Password</h2>
              <Form>
                {confirm}
                <Form.Group
                  className="mb-4"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    value={confirmpassword}
                    name="confirmPassword"
                    placeholder="enter password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmpassword}
                </Form.Group>
                <div className="profile_button">
                  <Button
                    onClick={handleSubmit}
                    className="profile_submit_button"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
              {message}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
