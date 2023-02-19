import { React, useState } from "react";

import { Button, Form } from "react-bootstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddBanner from "./AddBanner"
import Plus from "../../Assets/images/plus.png";
import axios from 'axios';
import { useEffect } from 'react';

const AddAds = () => {
    const [modalShow, setModalShow] = useState(false);
    const [alladds, setAlladds] = useState([]);


    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");

    const showallAdds = () => {
        console.log("Adds is Working........")
        var config = {
            method: 'get',
            url: 'https://digimonk.co/overwritedev/public/api/admin/get-ads',
            headers: {
                //   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTM2MDNjZTcyYWJjMDQzZGNkNzM1OGQwODA1ODVkMzlmMjgyYTg5Zjk0ZmIyYjA1MmU0ZTRlYWRlNGFhMDliMGY5NDA1YzQyYTQwYzU2YTQiLCJpYXQiOjE2Njk3ODM0MzMuNDU2OTg2LCJuYmYiOjE2Njk3ODM0MzMuNDU2OTg5LCJleHAiOjE3MDEzMTk0MzMuNDUzODg1LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.eJU0lfhUA5iuOpG0raooj0qUQX2UtR9rWpwK4rDxzWc2ulMlZBNu3hkMIBEo8pg19J3vCwli4T2dil3au9q9P163ed1yX7b3SLqntIukpdq4--NSTwHDSZ5HUGRxmTEtXPuA8yLPSL_PNvvCKsrafWYbwOPcmFSORuEmJ8n_NUuWftV3JoSiVjqLeM40vASDvOIXavlI1lDW_4XGuETQZWwgKd6BslajJPxNN6nFt2OeXRWm_W86PBnAL4dSDGiW9ywPsZVzCAJfcWS5XdjK_Nek1rP8aQRhlYYRDVHJCxv1pW520MLKJ84OS8ullEUpnxDSVcB-Moxr7Qt-ycvQp-JyTj24wCXxFY7EVbgAB84tQSe3nHikIeMmMRxorNiZrsPD7Wa-OMox_KZyroDfiNXyPhTdBokCbsHndtFZYIb-H1Srs4f3RLJ2O_Y6XK_NHzldWJhYzk0hoOuEvsqKfdOiuNPja6Pp17zDUma83gWargrff7N_gRcZZxf4h21VgwPG1xbnamu-myqZxkF1q3JGSyztyiZnuxxTyNQHVhnQjUYwjTw0pSukLCkaVglwJADZp0SHb9WLt-Qxd00W1VsyAYjvfrrDvdZwYF2YBs5LsNG7I5JFlH65YFgG3IPAjlxNYxQ461N5Sc3b7nIQaRNZSRsSYf-myPWAtrao67A', 
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + isLoggedIn,
            },
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setAlladds(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    useEffect(() => {
        showallAdds()
    }, [])


    return (
        <>
            <div className="categorylist_page">
                <div className="text-end me-2 py-2">
                    <Button
                        className="categorylist_btn"
                        onClick={() => setModalShow(true)}
                    >
                        Add
                    </Button>
                </div>
                <div className="card text-white bg-success mb-3 " >
                    <div className="d-flex justify-content-end mt-3">


                        <AddBanner show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                    {/* <div class="d-flex bd-highlight"> */}
                    {/* <div class="p-2 flex-fill bd-highlight"> */}
                    {/* <button style={{ marginTop: "15%" }} type="button" class="btn btn-primary">Add Adds</button> */}


                    <div className="categorylist_page">

                        <Table sx={{ minWidth: 950 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>

                                    <TableCell>Page Name</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Action</TableCell>

                                </TableRow>
                            </TableHead>
                            {/* {alladds.map((item) => (
                                <TableBody>

                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.imghome}</TableCell>
                                    <a style={{ color: "red", fontWeight: "bold", marginLeft: "7%" }}>Delete</a>

                                </TableBody>
                            ))} */}
                            <TableBody>

                                <TableCell>title</TableCell>
                                <TableCell>imghome</TableCell>
                                {/* <a style={{ color: "red", fontWeight: "bold", marginLeft: "7%" }}>Delete</a> */}
                                <button type="button" className="btn btn-danger" >Delete</button>
                            </TableBody>
                        </Table>
                    </div>

                </div>

            </div>

        </>
    );
};

export default AddAds;
