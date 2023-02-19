import { React, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Base_URL } from '../../utils/serverUrl'
import axios from "axios";


const AddGoogleAdds = (props) => {



    //////////////////////////////////////////////////////////////////////////////////////////////

    const [script, setScript] = useState("");
    console.log("script", script)

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
    // const isLoggedIn = (localStorage.getItem("userToken") || "").split(`"`)[1];
    const fetchData = () => {
        // e.preventDefault(e)
        console.log("w AddGoogle");
        var data = new FormData();
        data.append("script", script);

        var config = {
            method: 'post',

            url: `${Base_URL}admin/addgooglescript`,
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
    //////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <>
            {/* <h1>AddTermsAndUsage</h1> */}
            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="text-center">Add Google Adds</h1>
                    <Form>
                        <Form.Group className="mb-3">

                            <div className="mb-3">
                                <label className="form-label">Google Adds</label>
                                <textarea className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={script}
                                    onChange={(e) => setScript(e.target.value)}
                                // placeholder="Anderson@smith.com"
                                >

                                </textarea>
                            </div>

                        </Form.Group>

                        {/* <Form.Label>Description</Form.Label> */}
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

export default AddGoogleAdds;
