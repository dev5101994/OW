import { React, useState, useRef, useMemo, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Base_URL } from '../../utils/serverUrl'
import axios from "axios";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";



const AddBanner = (props) => {
    const [imghome, setImghome] = useState("");
    const [title, setTitle] = useState('');

    console.log(imghome, title, "imghome,title")
    // _____________img croprer________
    const [fileList, setFileList] = useState([
        // {
        //   uid: "-1",
        //   name: "image.png",
        //   status: "done",
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        // },
    ]);
    const onChange = ({ fileList }) => {
        setFileList(fileList);
        setImghome(fileList[0].originFileObj);

        // console.log(fileList[0].originFileObj, "jain");
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    // _____________________img croper ___________________
    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");
    //____________________API_______________________________//
    const addeditevent = (e) => {
        // e.preventDefault(e)
        console.log("Add Banner is work");
        var data = new FormData();
        data.append('title', title);
        // data.append('image', fs.createReadStream('/C:/Users/Digimonk/Downloads/download.jpg'));
        data.append('image', imghome);



        var config = {
            method: 'post',

            url: 'http://localhost/over_write/public/api/admin/addads',
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
    //____________________API_______________________________//

    useEffect(() => {
        addeditevent();
    }, []);


    return (
        <>

            <Modal {...props} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="text-center">Add Advertisement</h1>
                    <Form>
                        <select className="form-select" aria-label="Default select example" value={title}
                            onChange={(e) => setTitle(e.target.value)}>
                            <option selected>Open this select menu</option>
                            <option value="1">Home</option>
                            <option value="2">About</option>
                            <option value="3">Contact</option>
                            <option value="4">Community</option>
                        </select>
                        {/* ///////////////////////////////IMAGE CROP/////////////////////////////////////// */}
                        <div >
                            <div style={{ marginTop: "7%", marginLeft: "43%", marginRight: "43%", borderStyle: "ridge" }}>
                                <ImgCrop rotate>
                                    <Upload
                                        action="https://digimonk.co/overwritedev/public/images/communityimgs/"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                    >
                                        {fileList.length < 1 && "+ Upload"}
                                    </Upload>
                                </ImgCrop>
                            </div>
                            <div className="text-center">
                                <Button variant="primary" type="submit" style={{ marginTop: "10%", }} onClick={addeditevent} >
                                    Submit
                                </Button></div>
                        </div>
                        {/* ////////////////////////////////////////////////////////////////////// */}
                    </Form>

                </Modal.Body>
            </Modal>

        </>
    );
};

export default AddBanner;
