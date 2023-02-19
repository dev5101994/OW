import React, { useEffect } from "react";
import "../../Assets/Css/dashboard.css";
import { Button, Stack } from "react-bootstrap";
import Image9 from "../../Assets/images/image 9.png";
import { Base_URL, COMMUNITYSMALLIMG_URL } from "../../utils/serverUrl";
import axios from "axios";

const Recieved = () => {
  const [joinusers, setJoinuser] = React.useState([]);
  const [username, setUserName] = React.useState("");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");
  let userID = localStorage.getItem("userId");
  const recieveduser = () => {
    var config = {
      method: "post",
      url: `${Base_URL}joinrequest`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(response.data, "response data");
        setUserName(response.data.name);
        setJoinuser(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deletereq = (id) => {
    var data = new FormData();
    data.append("id", id);

    var config = {
      method: "post",
      url: `${Base_URL}deletejoinrequest`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const statusreq = (id, req) => {
    var data = new FormData();
    data.append("id", id);
    data.append("req", req);

    var config = {
      method: "post",
      url: `${Base_URL}statusrequest`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        recieveduser();
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    recieveduser();
  }, []);
  return (
    <div className="recieved_start table-responsive">
      <table cellpadding="0" cellspacing="0" border="0" className="table table-new">
        <thead>
          <tr>
            <th>Date</th>
            <th>Communty name</th>
            <th>creator</th>
            <th>invited as</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {joinusers.map((item) =>
            (item.state == "join" ? (
              Number(item.user_id) == Number(userID)
            ) : (
              Number(item.sent_user_id) == Number(userID)
            )) ? (
              <>
                <tr>
                  <td className="recieved_date">{item.created_at}</td>
                  <td>
                    <div className="recieved_img ">
                      <img
                        src={`${COMMUNITYSMALLIMG_URL}${item.image}`}
                        alt=""
                        className="recieved_img_first"
                      />
                      <div>
                        <p className="recieved_img_p_first ">{item.title}</p>
                        <p className="recieved_img_p_second ">
                          @{item.community_handle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="recieved_table_text">{item.creator_name}</td>
                  {item.role === 2 ? (
                    <>
                      <td className="recieved_table_text">Founder</td>{" "}
                    </>
                  ) : (
                    <td className="recieved_table_text">Member</td>
                  )}
                  <td>
                    {item.status === 1 ? (
                      <>
                        <Button className="recieved_button_third" disabled>
                          Recieved
                        </Button>
                      </>
                    ) : item.status === 2 ? (
                      <Button className="recieved_button_third approved" disabled>
                        Approved
                      </Button>
                    ) : (
                      <>
                        <Button className="recieved_button_third" disabled>
                          Rejected
                        </Button>
                      </>
                    )}
                  </td>
                  <td>
                    <Stack direction="horizontal">
                      <div>
                        {item.status === 2 ? (
                          <>
                            <Button
                              className="recieved_button_forth blurs"
                              onClick={() => statusreq(item.id, 2)}
                              disabled
                            >
                              Accepted
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="recieved_button_forth"
                            onClick={() => statusreq(item.id, 2)}
                          >
                            Accept
                          </Button>
                        )}
                      </div>
                      <div>
                        {item.status === 3 ? (
                          <>
                            <Button
                              className="ms-2 recieved_button_fifth"
                              onClick={() => statusreq(item.id, 3)}
                              disabled
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="ms-2 recieved_button_fifth"
                            onClick={() => statusreq(item.id, 3)}
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </Stack>
                  </td>
                </tr>
              </>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recieved;
