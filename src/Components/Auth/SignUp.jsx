import React, { useState } from "react";
import "../../Assets/Css/auth.css";
import { Container, Form, Button } from "react-bootstrap";
import Abcd1 from "../../Assets/images/abcd1.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";
import { SignUpApi } from "../api";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { crossicon } from "../../utils/svg.file";

const SignUp = () => {
  let gname = localStorage.getItem("googleName");
  let gmailname = gname?.replace(/^"(.+)"$/, "$1");
  let gemail = localStorage.getItem("googleEmail");
  let gmailEmail = gemail?.replace(/^"(.+)"$/, "$1");
  let gmailToken = localStorage.getItem("gmailToken");
  let gToken = gmailToken?.replace(/^"(.+)"$/, "$1");
  // console.log(gToken, "tookenr");
  let navigate = useNavigate();
  const [name, setName] = useState(gmailname);
  const [email, setEmail] = useState(gmailEmail);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setcPassword] = useState();

  const formik = useFormik({
    initialValues: {
      email: gmailEmail,
      fullname: gmailname,
      username: "",
      password: "",
      c_password: "",
      remember_token: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("plese enter valid email")
        .required("this is required field"),
      password: Yup.string()
        .min(5, "password must be greter then and equal to 5 charectors")
        .required("this is required field"),
      fullname: Yup.string()
        .min(2, "fullname greterthen 3  charecters ")
        .required("this is required field"),
      c_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "plese must be match")
        .required("confirm password  is must be  required "),
      username: Yup.string()
        .min(2, "username greterthen 3  charecters ")
        .required("this is required field"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${Base_URL}register`, {
          email: values.email,
          password: values.password,

          name: values.fullname,
          user_name: values.username,

          c_password: values.c_password,
          remember_token: gToken,
        })
        .then((result) => {
          console.log(result, "singup value");

          localStorage.setItem("userToken", result.data.success.token);
          localStorage.setItem("userId", result.data.success.user_id);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          navigate("/singin");
        });
    },
  });

  // const fetchData = async () => {
  //   var FormData = require("form-data");
  //   var data = new FormData();
  //   data.append("email", email);
  //   data.append("user_name", username);
  //   data.append("password", password);
  //   data.append("c_password", cpassword);

  //   data.append("name", name);
  //   data.append("remember_token", gToken);

  //   var result = await SignUpApi(data);

  //   if (result.data.status === true) {
  //     localStorage.setItem(
  //       "userToken",
  //       JSON.stringify(result.data.success.token)
  //     );
  //     navigate("/dashboard");
  //   } else {
  //     alert(Object.values(result.data));
  //   }
  // };
  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("userToken");
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      <div className="signup">
        <Container>
          <div className="signup_page">
          <div className="position-relative">
        <span>{crossicon}</span>
        </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="signup_form">
                  <span className="signup_heading">SIGN UP NOW</span>
                  <p className="signup_paragraph">Please Fill Your Details</p>
                  {formik.touched.fullname && formik.errors.fullname && (
                    <p style={{ color: "red" }}>{formik.errors.fullname}</p>
                  )}
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicFullName">
                      <Form.Label className="signup_form_label">
                        Full Name
                      </Form.Label>
                      <Form.Control
                        className="signup_form_control"
                        name="fullname"
                        // defaultValue={}
                        type="text"
                        placeholder="Enter Full Name"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    {formik.touched.email && formik.errors.email && (
                      <p style={{ color: "red" }}>{formik.errors.email}</p>
                    )}
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="signup_form_label">
                        Email address
                      </Form.Label>
                      <Form.Control
                        className="signup_form_control"
                        name="email"
                        // defaultValue={gmailEmail}
                        type="email"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    {formik.touched.username && formik.errors.username && (
                      <p style={{ color: "red" }}>{formik.errors.username}</p>
                    )}
                    <Form.Group className="mb-4" controlId="formBasicUsername">
                      <Form.Label className="signup_form_label">
                        User Name
                      </Form.Label>
                      <Form.Control
                        className="signup_form_control"
                        name="username"
                        type="text"
                        placeholder="Enter User Name"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    {formik.touched.password && formik.errors.password && (
                      <p style={{ color: "red" }}>{formik.errors.password}</p>
                    )}
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label className="signup_form_label">
                        Password
                      </Form.Label>
                      <Form.Control
                        className="signup_form_control"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    {formik.touched.c_password && formik.errors.c_password && (
                      <p style={{ color: "red" }}>{formik.errors.c_password}</p>
                    )}
                    <Form.Group
                      className="mb-4"
                      controlId="formBasicc_password"
                    >
                      <Form.Label className="signup_form_label">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        className="signup_form_control"
                        name="c_password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        value={formik.values.c_password}
                        // onChange={(e) => setcPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="text-center mb-3">
                      <Button
                        variant="primary"
                        className="signup_btn_btn"
                        type="submit"
                        // onClick={fetchData}
                      >
                       Sign Up
                      </Button>
                    </div>
                    <div className="signup_already_account">
                      <span className="signup_account_sign">
                      Already have an account?
                        <a href="/signin" className="signup_tag_a">
                          Sign In
                        </a>
                      </span>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <h1 className="signup_ow_head">OW</h1>
                  <div className="signup_img">
                    <img src={Abcd1} className="signup_image_abcd" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
