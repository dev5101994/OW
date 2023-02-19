import React from "react";
import "../../Assets/Css/dashboard.css";

import Title from "./title";
import Cards from "./cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";

const ContentCards = ({ title, cards }) => {
  const [allcomunity, setAllcomunity] = useState([]);
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const showCommunity = () => {
    let data = new FormData();

    let config = {
      method: "get",
      url: `${Base_URL}allcommunity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response?.data.data, "show community");
        setAllcomunity(response?.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    showCommunity();
  }, []);
  
  return (
    <>
      <Title title={title} />
      <Cards cards={allcomunity} />
    </>
  );
};

export default ContentCards;
