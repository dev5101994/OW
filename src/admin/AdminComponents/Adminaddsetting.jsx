import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Base_URL,
  COMMUNITYBIGIMG_URL,
  PROFILEIMG_URL,
} from "../../utils/serverUrl";


export default function Adminaddsetting() {
  const [scrollableModal, setScrollableModal] = useState(false);


  let navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [mailhost, setMailhost] = React.useState("");
  const [mailMailer, setMailMailer] = React.useState("");
  const [mailPort, setMailPort] = React.useState("");
  const [mailusername, setMailUsername] = React.useState("");
  const [mailPassword, setMailPassword] = React.useState("");

  console.log(email, facebook, twitter, mailhost, mailMailer, mailPort, mailusername, mailPassword, "consoledata");


  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");


  const showadmin = () => {
    console.log("working");
    // var axios = require('axios');
    // var FormData = require('form-data');
    // var axios = require('axios');
    // var FormData = require('form-data');
    var data = new FormData();
    data.append('gmail_client_id', email);
    data.append('fb_client_id', facebook);
    data.append('tw_client_id', twitter);
    data.append('host', mailhost);
    data.append('mailer', mailMailer);
    data.append('port', mailPort);
    data.append('username', mailusername);
    data.append('password', mailPassword);


    var config = {
      method: 'post',
      // url: 'http://localhost/over_write/public/api/admin/updatesetting',
      url: `${Base_URL}admin/updatesetting`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    showadmin();
  }, []);

  return (
    <>
      <div>
        <div className='setting_form'>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Gmail ClientId</Form.Label>
              <Form.Control type="text"
                placeholder="Gmail ClientId"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Facebook ClientId</Form.Label>
              <Form.Control type="text" placeholder="Facebook ClientId"
                defaultValue={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Twitter ClientId</Form.Label>
              <Form.Control type="text" placeholder="Twitter ClientId"
                defaultValue={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mail Host</Form.Label>
              <Form.Control type="text" placeholder="Mail Host"
                defaultValue={mailhost}
                onChange={(e) => setMailhost(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mail Mailer</Form.Label>
              <Form.Control type="text" placeholder="Mail Mailer"
                defaultValue={mailMailer}
                onChange={(e) => setMailMailer(e.target.value)}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mail Port</Form.Label>
              <Form.Control type="text" placeholder="Mail Port"
                defaultValue={mailPort}
                onChange={(e) => setMailPort(e.target.value)}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mail UserName</Form.Label>
              <Form.Control type="text" placeholder="Mail UserName"
                defaultValue={mailusername}
                onChange={(e) => setMailUsername(e.target.value)}

              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mail Password</Form.Label>
              <Form.Control type="password" placeholder="Mail Password"
                defaultValue={mailPassword}
                onChange={(e) => setMailPassword(e.target.value)}


              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit"
                onClick={showadmin}
              >
                Submit
              </Button></div>
          </Form>

        </div>
      </div>
    </>
  );
}