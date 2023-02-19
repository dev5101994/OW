import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AddTermsAndUsage from "./AddTermsAndUsage"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Base_URL } from '../../utils/serverUrl';
import { useEffect } from 'react';
import axios from 'axios';




const TermsOfUse = () => {
    const [modalShow, setModalShow] = useState(false);

    const [termsofuse, settermsofuse] = useState([]);
    console.log("termsofuseeeeeee", termsofuse)

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");

    const showalltermsofuse = () => {
        console.log("TermOfUsage is Working........")
        var config = {
            method: 'get',
            // url: `${Base_URL}/get-term`,
            url: 'https://digimonk.co/overwritedev/public/api/get-term',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + isLoggedIn,
            },

        };

        axios(config)
            .then(function (response) {
                console.log(response.data, 'testing');
                settermsofuse(response.data.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        showalltermsofuse()
    }, [])


    //Delete API
    const DeletePost = async (id) => {
        console.log("delete is working")
        const response = await axios
            .delete(`https://digimonk.co/overwritedev/public/api/admin/deleteterm/${id}`)
            .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data);
        }
    };





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
                <h1>TermsAndUsage</h1>


            </div>
            <AddTermsAndUsage show={modalShow} onHide={() => setModalShow(false)} />

            {/* ////////////////////////////////TERM OF USAGE LIST//////////////////////////////////////////// */}
            <div className="categorylist_page">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tittle</TableCell>
                            <TableCell>Description</TableCell>

                        </TableRow>
                    </TableHead>
                    {termsofuse.map((item) => (
                        <TableBody>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.discription}</TableCell>
                            <Button class="btn btn-danger" onClick={DeletePost}>Delete</Button>

                        </TableBody>
                    ))}

                </Table>
            </div>
        </>
    );
};

export default TermsOfUse;
