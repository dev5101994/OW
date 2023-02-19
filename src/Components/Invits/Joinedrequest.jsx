
import React, { useEffect } from "react";
import "../../Assets/Css/dashboard.css";
import { Button } from "react-bootstrap";
import Image9 from "../../Assets/images/image 9.png";
import axios from "axios";
import {
  Base_URL,
  COMMUNITYBIGIMG_URL,
  COMMUNITYSMALLIMG_URL,
  img_URL,
} from "../../utils/serverUrl";
const Joinedrequest = () => {
  const [joinusers, setJoinuser] = React.useState([]);
  const [username, setUserName] = React.useState('');
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");
  let userID = localStorage.getItem("userId");
  const joinuser = () => {
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
        console.log(response.data.data,'response data joined');
        setUserName(response.data.data)
        setJoinuser(response.data.data)
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deletereq =(id)=>{
var data = new FormData();
data.append('id', id);

var config = {
  method: 'post',
  url: `${Base_URL}deletejoinrequest`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + isLoggedIn,
  },
  data : data
};

axios(config)
.then(function (response) {
  // console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

  }
  useEffect(()=>{
    joinuser();
  },[])
  return (
    <div className="recieved_start table-responsive">
      <table cellpadding="0" cellspacing="0" border="0" className="table table-new">
        <thead>
          <tr>
            <th>Date</th>
            <th>Communty name</th>
            <th>Person name</th>
            <th>Joined as</th>
            {/* <th>Message</th> */}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {joinusers.map((item)=>(
          Number(item.sent_user_id) ==  Number(userID) && item.state == 'join' ?<>
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
            <td className="recieved_table_text">
              <p className="recieved_table_text_p1">{item.name}</p>
              <p className="recieved_table_text_p2">@{item.user_name}</p>
            </td>
            {item.role == 1?<>

            <td className="recieved_table_text">Member</td>
            </>:
            <td className="recieved_table_text">Founder</td>
            }
            <td>
            {item.status === 2 ?

              <Button className="recieved_button_first" disabled>
                Accepted
              </Button> :item.status === 3 ?
              <Button className="recieved_button_first" disabled>
                Rejected
              </Button>:<Button className="recieved_button_first" disabled>
                Sent
              </Button>
            }
            </td>
            <td>
              <Button className="recieved_button_eight" onClick={()=>deletereq(item.id)}>Delete Request</Button>
              {/* <Button className="ms-2">Accepted</Button> */}
            </td>
          </tr></>:null
          ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default Joinedrequest;
