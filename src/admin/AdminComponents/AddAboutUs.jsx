import { React, useState, useRef, useMemo } from "react";
import { Form, Modal } from "react-bootstrap";
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import { Base_URL } from '../../utils/serverUrl'
import axios from "axios";



const AddAboutUs = (props) => {

    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState('');

    console.log(content, title, "console AboutUs")

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");

    const fetchData = (e) => {
        // e.preventDefault(e)
        console.log("w Add about");
        var data = new FormData();
        data.append("title", title);
        data.append("discription", content);


        var config = {
            method: 'post',

            url: `${Base_URL}admin/addabout`,
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

    return (
        <>

            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="text-center">Add About us</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                                    // onChange={newContent => setContent(e.target.value)}
                                    onChange={(newContent) => setContent(newContent)}

                                />
                            </div>
                        </Form.Group>


                        <div className="text-center">
                            <Button variant="primary" type="submit" onClick={fetchData}>
                                Submit
                            </Button></div>


                    </Form>
                    {content}
                </Modal.Body>
            </Modal>

        </>
    );
};

export default AddAboutUs;
