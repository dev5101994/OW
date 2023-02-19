import React from "react";
import { styled } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import { useEffect } from "react";
import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",

    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Montserrat"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const SelectBox = (props) => {
  const [age, setAge] = React.useState("Select Category");
  const [user, setUser] = React.useState("Select Category");

  const handleChange = (event) => {
    setAge(event.target.value);
    // console.log("ebzsdb");
  };

  const fetchData = async () => {
    var config = {
      method: "get",
      url: `${Base_URL}allcategory`,
    };

    axios(config)
      .then(function(response) {
        setUser(response.data.data);
        // console.log("details", response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
    props.getcategory(age);
  }, [age]);

  return (
    <>
      <FormControl sx={{ minWidth: "100%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Select Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange}
          label="Select Category"
          onBlur={props.Callapi}
          // onBlur={() => props.Callapi}
        >
          {Object.values(user).map((item, index) => {
            return (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
export default SelectBox;
