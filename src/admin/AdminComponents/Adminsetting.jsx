import React from 'react';
import "../../Assets/Css/styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Adminsetting = () => {
  return (
    <>
    <div className="buttonposition">
    <Link to="/addsettings">

      <Button  variant="contained">Add Settings</Button>
    </Link>
      </div>
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
          <TableBody>
            <TableCell>1</TableCell>
            <TableCell>Akash</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>OverWright</TableCell>
            <TableCell>Category list</TableCell>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Adminsetting