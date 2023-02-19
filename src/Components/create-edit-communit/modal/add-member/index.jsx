import React from "react";
import { Form } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { Base_URL } from "../../../../utils/serverUrl";
import { useEffect, useState, useRef } from "react";

const AddMember = ({ setIsSubmitting, isSubmitting, showmembers }) => {
  const [value, setValue] = React.useState("");
  const [datavalue, setDatavalue] = React.useState("");
  const [showdata, setShowdata] = React.useState([]);
  const [isSuggestedSearch, setIsSuggestedSearch] = useState(false);
  const [usernames, setUsername] = useState("");
  const [members, setMember] = useState("");
  const [usernamesID, setUsernameID] = useState("");
  const onHandleSearch = () => {
    setIsSuggestedSearch(!isSuggestedSearch);
    setDatavalue("");
  };
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  let community_id = localStorage.getItem("community_id");

  let user_ids = localStorage.getItem("userId");

  // const inputRef = useRef(null);

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
        console.log(response.data.success, "dadadadad");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showuser();
  }, [datavalue]);
  const username = (name, id) => {
    setUsername(name);
    setUsernameID(id);
    // console.log(inputRef.current.value, "ref");
    // console.log(usernames, "name");
    // setUsername(name);
  };
  const handleSubmit = () => {
    // console.log(invitedata,'gdhhhd')
    var data = new FormData();
    data.append("community_id", community_id);
    data.append("sent_user_id", usernamesID);
    data.append("user_id", user_ids);
    data.append("role", members);

    var config = {
      method: "post",
      url: `${Base_URL}joinuser`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data, "add members data");
        showmembers();
        setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
    }
  }, [isSubmitting]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="py-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <div className="position-relative">
            <input
              type="search"
              aria-label="Search"
              onChange={(e) => {
                setUsername(e.target.value);
                setDatavalue(e.target.value);
              }}
              onClick={onHandleSearch}
              className="form-control-input"
              value={usernames}
              // ref={inputRef}
              placeholder="type hear"
              // {usernames}
            />

            {isSuggestedSearch ? (
              <>
                <div className="searchbar_search">
                  <ul>
                    {showdata.map((item, index) =>
                      item.id !== user_ids ? (
                        <>
                          <li
                            onClick={() => {
                              username(item.user_name, item.id);
                              setIsSuggestedSearch(false);
                            }}
                          >
                            {item.user_name}
                          </li>
                        </>
                      ) : null
                    )}
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
            value="member"
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
            label={[<span className="check-label-text">Member</span>]}
          />
        </RadioGroup>
      </Form>
    </div>
  );
};
export default AddMember;
