import React, { useEffect, useState } from "react";
import "../../src/Assets/Css/auth.css";
import { Form, Button } from "react-bootstrap";
import Abcd1 from "../../src/Assets/images/abcd1.svg";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../Components/api";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const fetchData = async () => {
    var data = new FormData();
    data.append("email", email);
    data.append("password", password);

    var result = await LoginApi(data);
    if (result.data.token && result.data.user_id == 13) {
      localStorage.setItem("userToken", JSON.stringify(result.data.token));
      navigate("/admin");
    } else {
      alert(result.data.message);
    }
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userToken");
    if (isLoggedIn) {
      navigate("/adminlogin");
    }
  }, []);

  return (
    <>
      <div className="signin">
        <div className="container">
          <div className="signin_page">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="signin_form">
                  <span className="signin_heading">WELCOME ADMIN </span>
                  <p className="signin_paragraph">Please Fill Your Details</p>
                  <Form>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="signin_form_label">
                        Email address
                      </Form.Label>
                      <Form.Control
                        className="signin_form_control"
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label className="signin_form_label">
                        Password
                      </Form.Label>
                      <Form.Control
                        className="signin_form_control"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    {["checkbox"].map((type) => (
                      <div key={`default-${type}`} className="text-end mb-3">
                        <a href="#" className="signin_forgot_password">
                          Forgot Password?
                        </a>
                      </div>
                    ))}
                    <div className="text-center mb-3">
                      <Button
                        variant="primary"
                        className="signin_btn_btn"
                        onClick={fetchData}
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div>
                  <h1 className="signin_ow_head">OW</h1>
                  <div className="signin_img">
                    <img src={Abcd1} className="signin_image_abcd" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
