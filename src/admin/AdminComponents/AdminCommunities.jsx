import React from "react";
import "../../Assets/Css/styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";
import { useState } from "react";
import { useEffect } from "react";
import { Switch } from "@mui/material";
// import ToggleSwitch from "./components/ToggleSwitch";

const AdminCommunities = () => {
  const [allcommunity, setAllcommunity] = useState([]);
  const [communityTypes, setCommunityTypes] = useState([]);

  const handleCommunityType = (data) => {
    let checkExist = communityTypes.some((el) => el.value === data.value);
    if (checkExist) {
      // edit
      let updateItemIndex = communityTypes.findIndex(el => el.value === data.value)
      communityTypes[updateItemIndex].type = data.type
    } else {
      setCommunityTypes([...communityTypes, data]);
    }
  };

  let tokenId = localStorage.getItem("userToken");
  let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
  const showallcommunity = () => {
    var config = {
      method: "get",
      url: `${Base_URL}admin/alladmincommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
    };

    axios(config)
      .then(function(response) {
        console.log(response, "testing");
        setAllcommunity(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const handleChange = () => {
    return true;
  };
  useEffect(() => {
    showallcommunity();
  }, []);
  /////////////////////////manage Community///////////////////////////////

  const managecommunity = (id, type) => {
    var data = new FormData();
    data.append("id", id);
    data.append("status", type);
    var config = {
      method: "post",

      url: `${Base_URL}admin/managecommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };
    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
        showallcommunity();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  /////////////////////////manage Community///////////////////////////////
  return (
    <>
      <div className="categorylist_page">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              {/* <TableCell>Image</TableCell> */}
              <TableCell>User</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Community Handle</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Futured</TableCell>
              <TableCell>Top</TableCell>
              <TableCell>Latest</TableCell>
            </TableRow>
          </TableHead>
          {allcommunity.map((item) => (
            <TableBody>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.user_name}</TableCell>
              <TableCell>{item.category_name}</TableCell>
              <TableCell>{item.community_title}</TableCell>
              <TableCell>{item.community_handle}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>
                <Switch
                  checked={
                    item.status === 1
                  }
                  onClick={() => {
                    handleCommunityType({ type: 1, value: item.id });
                    managecommunity(item.id, 1);
                  }}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={
                    item.status === 2
                  }
                  onClick={() => {
                    handleCommunityType({ type: 2, value: item.id });
                    managecommunity(item.id, 2);
                  }}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={
                    item.status === 3 
                  }
                  onClick={() => {
                    handleCommunityType({ type: 3, value: item.id });
                    managecommunity(item.id, 3);
                  }}
                />
              </TableCell>
            </TableBody>
          ))}
        </Table>
      </div>
    </>
  );
};

export default AdminCommunities;
