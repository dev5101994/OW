import { React, useState } from 'react';
import "../../Assets/Css/styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Base_URL } from "../../utils/serverUrl"
import axios from "axios";
import { useEffect } from "react";


const User = () => {

  const [alluser, setAlluser] = useState([]);


  let token = localStorage.getItem("userToken");

  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const showalluser = () => {

    var config = {
      method: 'get',
      url: `${Base_URL}admin/userlist`,

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },


    };
    axios(config)
      .then(function (response) {
        console.log(response.data, 'testing');
        setAlluser(response.data.list)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    showalluser()
  }, [])











  return (
    <>
      <div className="categorylist_page">

        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          {alluser.map((item) => (
            <TableBody>
              <TableCell>{item.id} </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.user_name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.email_verified_at}</TableCell>
              <TableCell>{item.image}</TableCell>
              <TableCell>{item.tiktok}</TableCell>
              <TableCell>{item.linkedin}</TableCell>
              <TableCell>{item.instagram}</TableCell>
              <TableCell>{item.twitter}</TableCell>
              <TableCell>{item.facebook}</TableCell>
              <TableCell>{item.bio}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>{item.updated_at}</TableCell>
              {/* <TableCell>OverWright</TableCell>
              <TableCell>Category list</TableCell> */}
            </TableBody>
          ))}
        </Table>
      </div>
    </>
  );
}

export default User