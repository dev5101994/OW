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


const Acts = () => {
  const [allacts, setAllacts] = useState([]);

  let token = localStorage.getItem("userToken");

  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const showallact = () => {

    var config = {
      method: 'get',
      url: `${Base_URL}admin/actlist`,

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },


    };
    axios(config)
      .then(function (response) {
        console.log(response.data, 'testing');
        setAllacts(response.data.list)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    showallact()
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
          {allacts.map((item) => (
            <TableBody>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.community_id}</TableCell>
              <TableCell>{item.user_id}</TableCell>
              <TableCell>{item.act_name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.image}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>{item.updated_at}</TableCell>


              <TableCell></TableCell>
            </TableBody>
          ))}        </Table>
      </div>
    </>
  );
}

export default Acts