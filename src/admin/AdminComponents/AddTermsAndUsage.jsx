import { React, useState, useRef, useMemo } from "react";
import { Form, Modal } from "react-bootstrap";
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import { Base_URL } from '../../utils/serverUrl'
import axios from "axios";



const AddTermsAndUsage = (props) => {

    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState('');

    // console.log(title, "consoledata");
    // const handleTittle = (e) => {
    //     setTitle(e.target.value)
    // }

    // const handleDiscription = (e) => {
    //     setDiscription(e.target.value)
    // }

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");

    const fetchData = () => {
        // var axios = require('axios');
        console.log("i m gaurav");
        var data = new FormData();
        data.append("title", title);
        data.append("discription", content);

        var config = {
            method: 'post',
            // url: 'https://digimonk.co/overwritedev/public/api/admin/addterm?discription=aaaaaaaaaaaaaaaaaaaaa&title=cccccccccccccccccc',
            url: 'https://digimonk.co/overwritedev/public/api/admin/addterm',
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
    }

    return (
        <>
            <h1>AddTermsAndUsage</h1>
            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="text-center">Terms and Use</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            // onChange={handleTittle}
                            />
                            <br />
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label edit_profile_lebal"
                                >
                                    Bio
                                </label>


                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    // config={config}
                                    // tabIndex={1} // tabIndex of textarea
                                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(newContent) => setContent(newContent)}
                                />
                            </div>
                        </Form.Group>

                        {/* <Form.Label>Description</Form.Label> */}
                        <div className="text-center">
                            <Button variant="primary" type="submit" onClick={fetchData}>
                                Submit
                            </Button></div>



                    </Form>
                    {/* {discription} */}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddTermsAndUsage;
