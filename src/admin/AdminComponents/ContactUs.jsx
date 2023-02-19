import { React, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useEffect } from 'react';
import AddContactUs from "./AddContactUs";
import { Base_URL } from '../../utils/serverUrl'
import axios from 'axios';

const ContactUs = () => {
    const [modalShow, setModalShow] = useState(false);
    /////////////////////////////////////////////////////////////////////////////////////////////
    const [contactus, setContactus] = useState([]);
    console.log("contactus......", contactus)

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");


    const showallcontactus = () => {
        console.log("Contact is Working........")
        var config = {
            method: 'get',
            url: `${Base_URL}admin/get-contact`,
            // url: 'https://digimonk.co/overwritedev/public/api/get-contact',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + isLoggedIn,
            },

        };

        axios(config)
            .then(function (response) {
                console.log(response.data, 'testing');
                setContactus(response.data.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        showallcontactus()
    }, [])

    const DeletePost = async (id) => {
        console.log("delete is working")
        const response = await axios
            .delete(`https://digimonk.co/overwritedev/public/api/admin/deletecontact/${id}`)
            .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////
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
                <h1>AddContactUs</h1>
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">no</th> */}
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {contactus?.map((item) => (
                        <tbody className="table-group-divider">
                            <tr>
                                {/* <th scope="row">1</th> */}
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => DeletePost(item.id)}>Delete</button></td>
                            </tr>

                        </tbody>
                    ))}
                </table>

            </div>
            <AddContactUs show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default ContactUs;
