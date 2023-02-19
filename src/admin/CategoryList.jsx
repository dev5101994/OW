import { React, useState } from "react";
import "../Assets/Css/styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Form } from "react-bootstrap";
import AddCategory from "./AddCategory";
import { Switch } from "@mui/material";
import { Base_URL } from "../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";

const CategoryList = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSwitch1, setIsSwitch1] = useState(false);
  const [isSwitch2, setIsSwitch2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ischecked, setCheckedswitch] = useState(false);
  const [unchecked, setCheckedswitch1] = useState(false);
  const [allcategory, setAllcategory] = useState([]);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  }
  const toggleSwitchCheck = () => {
    setIsSwitch1((previousState) => !previousState);
  }
  const toggleSwitchBox = () => {
    setIsSwitch2((previousState) => !previousState)

  }

  // console.log(checked, "chck sdhsaju");
  // console.log(isSwitch1, "swwe sdhsaju");
  // console.log(isEnabled, "emai sdhsaju");
  const showallcategory = () => {

    var config = {
      method: 'get',
      url: `${Base_URL}allcategory`,

    };

    axios(config)
      .then(function (response) {
        console.log(response.data, 'testing');
        setAllcategory(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {
    showallcategory()
  }, [])

  ///////////////////////////////////////////////DELETE CATEGORY///////////////////////////////////////
  const DeletePost = async (id) => {
    console.log("delete is working")
    const response = await axios
      .delete(`https://digimonk.co/overwritedev/public/api/admin/delete-category/${id}`)
      .catch((error) => console.log("Error: ", error));
    if (response && response.data) {
      console.log(response);
      console.log(response.data);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="categorylist_page">
        <div className="text-end me-2 py-2">
          <Button
            // className="categorylist_btn"
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            Add Category
          </Button>
        </div>

        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              {/* <TableCell>Description</TableCell> */}
            </TableRow>
          </TableHead>
          {allcategory.map((item) => (
            <TableBody>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.discription}</TableCell>
              {/* <TableCell>OverWright</TableCell> */}
              <TableCell><button type="button" class="btn btn-warning">Edit</button></TableCell>
              <TableCell><button type="button" class="btn btn-danger" onClick={() => DeletePost(item.id)}>Delete</button></TableCell>
            </TableBody>
          ))}
        </Table>
      </div>
      <AddCategory show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default CategoryList;
