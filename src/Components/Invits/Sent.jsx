import React, { useEffect } from "react";
import "../../Assets/Css/dashboard.css";
import { Button } from "react-bootstrap";
import Image9 from "../../Assets/images/image 9.png";
import axios from "axios";
import { Base_URL, COMMUNITYSMALLIMG_URL } from "../../utils/serverUrl";
import { number } from "yup";

const Sent = () => {
  const [joinusers, setJoinuser] = React.useState([]);
  const [username, setUserName] = React.useState("");
  let token = localStorage.getItem("userToken");
  let userID = localStorage.getItem("userId");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");
  const sentrequest = () => {
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
        console.log(response.data.data, "response data");
        setUserName(response.data.name);
        setJoinuser(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    sentrequest();
  }, []);
  return (
    <div className="recieved_start table-responsive">
      <table cellpadding="0" cellspacing="0" border="0" className="table table-new">
        <thead>
          <tr>
            <th>Date</th>
            <th>Communty name</th>
            <th>creator</th>
            <th>invitation sent to </th>
            <th>Invited as</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
        {joinusers.map((item)=>(
        Number(item.user_id) ==  Number(userID) && item.state == null?<>
        
          <tr>
            <td className="recieved_date">{item.created_at}</td>
            <td>
              <div className="recieved_img ">
                <img src={`${COMMUNITYSMALLIMG_URL}${item.image}`} alt="" className="recieved_img_first" />
                <div>
                  <p className="recieved_img_p_first ">{item.title}</p>
                  <p className="recieved_img_p_second ">@{item.community_handle}</p>
                </div>
              </div>
            </td>
            <td className="recieved_table_text">{item.creator_name}</td>
            <td className="recieved_table_text">{item.name}</td>
            {item.role == 2?<>

            <td className="recieved_table_text">Founder</td>
            </>:
            <td className="recieved_table_text">Member</td>

            }
            <td>
            {item.status == 1?<>

              <Button className="recieved_button_third">Pending</Button></>
              :item.status == 2?<><Button className="recieved_button_sixth">Accepted</Button></>:
              <Button className="recieved_button_third">Rejected</Button>

            }
            </td>
          </tr></>:null
        
          
        ))}
          
          
        </tbody>
      </table>
    </div>
  );
};

export default Sent;
