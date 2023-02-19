import { React, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AddAboutUs from "./AddAboutUs"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Base_URL } from '../../utils/serverUrl';
import { useEffect } from 'react';
import axios from 'axios';


const AboutUS = () => {
    const [modalShow, setModalShow] = useState(false);


    const [aboutus, setAboutus] = useState([]);
    console.log("aboutus......", aboutus)

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");


    const showallaboustus = () => {
        console.log("About is Working........")
        var config = {
            method: 'get',
            // url: `${Base_URL}get-about`,
            url: 'https://digimonk.co/overwritedev/public/api/get-about',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + isLoggedIn,
            },

        };

        axios(config)
            .then(function (response) {
                console.log(response.data, 'testing');
                setAboutus(response.data.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        showallaboustus()
    }, [])


    const DeletePost = async (id) => {
        console.log("delete is working")
        const response = await axios
            .delete(`https://digimonk.co/overwritedev/public/api/admin/deleteabout/${id}`)
            .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data);
        }
    };


    // const EditPost = () => {




    // }


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
                <h1>About Us</h1>


            </div>
            <AddAboutUs show={modalShow} onHide={() => setModalShow(false)} />

            {/* ////////////////////////////////ABOUT US LIST//////////////////////////////////////////// */}
            <div className="categorylist_page">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tittle</TableCell>
                            <TableCell>Description</TableCell>

                        </TableRow>
                    </TableHead>

                    {aboutus?.map((item) => (
                        <TableBody>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.discription}</TableCell>
                            <Button type="button" className="btn btn-danger" onClick={() => DeletePost(item.id)}>Delete</Button>
                            {/* <Button type="button" class="btn btn-success" onClick={() => EditPost()}>Edit</Button> */}
                            {/* <Button
                                style={{ marginLeft: "3%" }}
                                className="btn btn-warning"
                                onClick={() => setModalShow(true)}
                            >
                                Edit
                            </Button> */}
                        </TableBody>

                    ))}

                </Table>
            </div>

        </>
    );
};

export default AboutUS;
