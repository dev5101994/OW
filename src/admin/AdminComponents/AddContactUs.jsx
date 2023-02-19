import { React, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Base_URL } from '../../utils/serverUrl'
import axios from "axios";

const AddContactUs = (props) => {

    /////////////////////////////////////////////////////////////////////////////////////////////
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
    // const isLoggedIn = (localStorage.getItem("userToken") || "").split(`"`)[1];
    const fetchData = (e) => {
        // e.preventDefault(e)
        console.log("w Add about");
        var data = new FormData();
        data.append("email", email);
        data.append("phone", phone);
        data.append("address", address);

        var config = {
            method: 'post',

            url: `${Base_URL}admin/addcontact`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + isLoggedIn,
            },
            data: data

        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    /////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>

            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="text-center">Add Contact Us</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <div className="row">
                                <div className="mb-3 col-lg-6">
                                    <label
                                        // for="exampleInputText"
                                        className="form-label edit_profile_lebal"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control edit_profile_input_area"
                                        id="exampleInputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="Anderson@smith.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-lg-6">
                                    <label
                                        // for="exampleInputtext"
                                        className="form-label edit_profile_lebal"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control edit_profile_input_area"
                                        id="exampleInputnumber"
                                        placeholder="+1 9999999999"
                                        defaultValue={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <label
                                    // for="exampleInputtext"
                                    className="form-label edit_profile_lebal"
                                >
                                    Address
                                </label>
                                <div className="form-group">

                                    <input type="text"
                                        className="form-control"
                                        id="formGroupExampleInput"
                                        placeholder="26985 Brighton Lane, Lake Forest, CA 92630"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />

                                </div>

                            </div>

                        </Form.Group>


                        <div className="text-center">
                            <Button variant="primary" type="submit" onClick={fetchData}>
                                Submit
                            </Button></div>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddContactUs;
