import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SelectBox from "../../../selectbox";
import { Base_URL } from "../../../../utils/serverUrl";
import axios from "axios";
import { Stack } from "react-bootstrap";
import CancelBtn from "../../../cancelbutton";
import PrimaryButton from "../../../cancelbutton/primarybutton";

const AddInvite = (props) => {
  const [value, setValue] = useState("female");
  const [community, setcommunity] = React.useState([]);
  const [datavalue, setDatavalue] = React.useState("");
  const [showdata, setShowdata] = React.useState([]);
  const [isSuggestedSearch, setIsSuggestedSearch] = useState(false);
  const [usernames, setUsername] = useState("");
  const [usernamesID, setUsernameID] = useState("");
  const [communityID, setCommunityID] = useState("");
  const [memberID, setMember] = useState("");

  useEffect(() => {
    if (props.handleInviteValueChange)
      props.handleInviteValueChange({ usernamesID, communityID, memberID });
  }, [usernamesID, communityID, memberID]);
  const onHandleSearch = () => {
    setIsSuggestedSearch(!isSuggestedSearch);
    setDatavalue("");
  };

  let token = localStorage.getItem("userToken");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");

  const showcummunity = () => {
    var config = {
      method: "get",
      url: `${Base_URL}showcommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data.data, "community");
        setcommunity(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const inputRef = useRef(null);
  const username = (name, id) => {
    setUsername(name);
    setUsernameID(id);
  };
  useEffect(() => {
    showcummunity();
  }, []);

  const showuser = () => {
    var data = new FormData();
    data.append("name", datavalue);

    var config = {
      method: "post",
      url: `${Base_URL}get-username`,

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        // console.log(response.data, "data data");
        setShowdata(response.data.success);
        // console.log(response.data.success, "dadadadad");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  // const comId = (id) => {
  //   console.log(id, "ashdhshdshaj");
  //   setCommunityID(id);
  // };
  useEffect(() => {
    showuser();
  }, [datavalue]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="py-3">
      <Form>
        <Form.Group className="mb-3 newchapater">
          <Form.Label>Select Community</Form.Label>
          <Form.Select
            className="form_select_input"
            onChange={(e) => setCommunityID(e.target.value)}
          >
              <option>Select Community</option>
            {community.map((item) => (

              <option value={item.id}>{item.title}</option>
            ))}
          </Form.Select>

          {/* <SelectBox /> */}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <div className="position-relative">
            <input
              type="search"
              //  placeholder="Search for Communities"
              aria-label="Search"
              onChange={(e) => {
                setUsername(e.target.value);
                setDatavalue(e.target.value);
              }}
              onClick={onHandleSearch}
              className="form-control-input"
              value={usernames}
              // ref={inputRef}
              placeholder={usernames}
              // {usernames}
            />

            {isSuggestedSearch ? (
              <>
                <div className="searchbar_search">
                  <ul>
                    {showdata.map((item, index) => (
                      <li
                        onClick={() => {
                          username(item.user_name, item.id);
                          setIsSuggestedSearch(false);
                        }}
                      >
                        {item.user_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </Form.Group>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          className="mb-3"
        >
          <FormControlLabel
            value="founder"
            onChange={(e) => setMember(e.target.value)}
            control={
              <Radio
                sx={{
                  color: "#5E5E5E",
                  "&.Mui-checked": {
                    color: "#16A34A",
                  },
                }}
              />
            }
            label={[<span className="check-label-text">Founder</span>]}
          />
          <FormControlLabel
            onChange={(e) => setMember(e.target.value)}
            value="member"
            control={
              <Radio
                sx={{
                  color: "#5E5E5E",
                  "&.Mui-checked": {
                    color: "#16A34A",
                  },
                }}
              />
            }
            label={[<span className="check-label-text">Member</span>]}
          />
        </RadioGroup>
      </Form>
    </div>
  );
};

export default AddInvite;
