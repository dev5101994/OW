import React from "react";
import "../../Assets/Css/auth.css";
import { Form, Button } from "react-bootstrap";
import Abcd1 from "../../Assets/images/abcd1.svg";
import { Twitter, Facebook, crossicon } from "../../utils/svg.file";
import Google from "../../Assets/images/google.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoginApi } from "../api";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
// import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { signInWithGoogle } from "../../firebase";
import { auth, google, facebook } from "../../firebase";
import { async } from "@firebase/util";
import { Base_URL } from "../../utils/serverUrl";
import axios from "axios";

const SignIn = () => {
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("plese enter valid email")
        .required("this is required field"),
      password: Yup.string()
        .min(5, "password must be greter then and equal to 5 charectors")
        .required("this is required field"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${Base_URL}login`, {
          email: values.email,
          password: values.password,
        })
        .then((result) => {
          // console.log(result, "login value");

          if (result.data.token) {
            localStorage.setItem("userToken", result.data.token);
            localStorage.setItem("userId", result.data.user_id);
            navigate("/dashboard");
          } else {
            alert(result.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  // const fetchData = async () => {
  //   var FormData = require("form-data");
  //   var data = new FormData();
  //   data.append("email", email);
  //   data.append("password", password);

  //   var result = await LoginApi(data);
  //   // console.log(result.data.token, "datatdt");
  //   if (result.data.token) {
  //     localStorage.setItem("userToken", result.data.token);
  //     localStorage.setItem("userId", result.data.user_id);
  //     navigate("/dashboard");
  //   } else {
  //     alert(result.data.message);
  //   }
  // };

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("userToken");
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, []);

  const login = async (provider) => {
    google.setCustomParameters({
      prompt: "select_account",
    });
    const result = await signInWithPopup(auth, provider);
    setUser(result);
    // console.log(result, "data");
    localStorage.setItem("googleEmail", JSON.stringify(result.user.email));
    localStorage.setItem("googleName", JSON.stringify(result.user.displayName));
    localStorage.setItem("gmailToken", JSON.stringify(result.user.accessToken));

    navigate("/signup");
  };

  // const logout = async () => {
  //   const result = await auth.signOut(auth);
  //   // console.log(signOut(auth));
  //   setUser(null);
  //   console.log(result);
  // };
  // const logout = () => {
  //   signOut(auth)
  //     .then((res) => {
  //       setUser(null);
  //       console.log("Logout Succes", res);
  //       // Sign-out successful.
  //     })
  //     .catch((error) => {
  //       console.log("Logout fail", error);
  //       // An error happened.
  //     });
  // };

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log({ user });
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     console.log("user SignOut");
  //     // User is signed out
  //     // ...
  //   }
  // });

  // console.log(user);
  // const afterSignInCallback = (user) => {
  //   console.log({ user });
  //   navigate("/signup");
  // };

  return (
    <>
      <div className="signin">
     
        <div className="container">
          <div className="signin_page">
          <div className="position-relative">
        <span>{crossicon}</span>
        </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="signin_form">
                  <span className="signin_heading">WELCOME BACK </span>
                  <p className="signin_paragraph">Welcome back! Please enter your details.</p>
                  <Form onSubmit={formik.handleSubmit}>
                    {formik.touched.email && formik.errors.email && (
                      <p style={{ color: "red" }}>{formik.errors.email}</p>
                    )}
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label className="signin_form_label">
                        Email 
                      </Form.Label>
                      <Form.Control
                        className="signin_form_control"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    {formik.touched.password && formik.errors.password && (
                      <p style={{ color: "red" }}>{formik.errors.password}</p>
                    )}
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label className="signin_form_label">
                        Password
                      </Form.Label>
                      <Form.Control
                        className="signin_form_control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                    </Form.Group>

                    {["checkbox"].map((type) => (
                      <div key={`default-${type}`} className="signin_checkbox">
                        <Form.Check
                          type={type}
                          id={`default-${type}`}
                          label={`Remember Me`}
                          className="signin_label_checkbox"
                        />
                        <a href="#" className="signin_forgot_password">
                          Forgot Password?
                        </a>
                      </div>
                    ))}
                    <div className="text-center mb-3">
                      <Button
                        variant="primary"
                        className="signin_btn_btn"
                        type="submit"
                        // onClick={fetchData}
                      >
                        Sign In
                      </Button>
                    </div>
                    <div className="sign_in_social_icon">
                      <ul className="sign_in_social_icon_ul">
                        <li
                          className="sign_in_social_icon_li"
                          // onClick={() => signInWithGoogle(afterSignInCallback)}
                          onClick={() => login(google)}
                        >
                          <a href="#" className="sign_in_social_icon_li_a">
                            <img src={Google} />
                          </a>
                        </li>
                        <li
                          className="sign_in_social_icon_li"
                          onClick={() => login(facebook)}
                        >
                          <a href="#" className="sign_in_social_icon_li_a">
                            {Facebook}
                          </a>
                        </li>
                        <li className="sign_in_social_icon_li">
                          <a href="#" className="sign_in_social_icon_li_a">
                            {Twitter}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="signin_account_sign">
                      <span>
                      Don’t have an account?
                        <a href="/signup" className="signin_tag_anchor">
                          Sign Up
                        </a>
                      </span>
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

export default SignIn;
