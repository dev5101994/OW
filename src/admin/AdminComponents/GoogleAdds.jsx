import { React, useState } from "react";

import { Button, Form } from "react-bootstrap";

import AddGoogleAdds from "./AddGoogleAdds";
import { Base_URL } from '../../utils/serverUrl'
import axios from 'axios';
import { useEffect } from 'react';

const GoogleAdds = () => {
    const [modalShow, setModalShow] = useState(false);

    /////////////////////////////////////////////////////////////////////////////////////////////
    const [googleadds, setGoogleadds] = useState([]);
    console.log("GoogleAdds......", googleadds)

    let tokenId = localStorage.getItem("userToken");
    let isLoggedIn = tokenId?.replace(/^"(.+)"$/, "$1");


    const showallgoogleAdds = () => {
        console.log("GoogleAdds is Working........")
        var config = {
            method: 'get',
            url: `${Base_URL}admin/get-googlescript`,
            // url: 'https://digimonk.co/overwritedev/public/api/admin/get-googlescript',
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + isLoggedIn,
            },

        };

        axios(config)
            .then(function (response) {
                console.log(response.data, 'testing');
                setGoogleadds(response.data.data)
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        showallgoogleAdds()
    }, [])

    const DeletePost = async (id) => {
        console.log("delete is working")
        const response = await axios
            .delete(`https://digimonk.co/overwritedev/public/api/admin/deletegooglescript/${id}`)
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
                <h1>Google Adds</h1>

                {/* <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains</p> */}
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Paragraph</th>
                            {/* <th scope="col">Edit</th> */}
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    {googleadds?.map((item) => (
                        <tbody className="table-group-divider">
                            <tr>
                                {/* <th scope="row">1</th> */}
                                <td><p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains</p>
                                </td>
                                {/* <td><button type="button" class="btn btn-warning">Edit</button></td> */}
                                <td><button type="button" className="btn btn-danger" onClick={() => DeletePost(item.id)}>Delete</button></td>
                            </tr>


                        </tbody>
                    ))}
                </table>

            </div>
            <AddGoogleAdds show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default GoogleAdds;
