import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../Assets/Css/dashboard.css";
import { Base_URL } from "../../utils/serverUrl";
import {
  FooterFacebook,
  FooterTwitter,
  Linkedin,
  PinterestIcon,
} from "../../utils/svg.file";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [cardArray, setcardArray] = useState([]);
  let navigate = useNavigate();
  const fetchData = async () => {
    var config = {
      method: "get",
      url: `${Base_URL}allcategory`,
    };

    axios(config)
      .then(function(response) {
        setcardArray(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const footer = [
    {
      title: "OverWrite",
      footerArray: [
        {
          home: "Home",
        },
      ],
    },
  ];
  return (
    <>
      <div className="footer_page">
        <Container>
          <div className="row">
            <div className="col-lg-4">
              <h1 className="footer_brand">OW</h1>
              <p className="footer_title">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad
              </p>
              <div className="footer_social_icon">
                <a href="#" className="footer_icon">
                  {FooterFacebook}
                </a>
                <a href="#" className="footer_icon_social">
                  {FooterTwitter}
                </a>
                <a href="#" className="footer_icon_social">
                  {Linkedin}
                </a>
                <a href="#" className="footer_icon_social">
                  {PinterestIcon}
                </a>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div>
                    <ul className="footer_ul">
                      <li>
                        <h1 className="footer_li_title">OverWrite</h1>
                      </li>
                      <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Home
                        </a>
                      </li>
                      <li
                        className="footer_li_text"
                        onClick={() => navigate(`/my-communities`)}
                      >
                        <a href="#" className="footer_li_text_a">
                          Communities
                        </a>
                      </li>
                      <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          About Us
                        </a>
                      </li>
                      <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div>
                    <ul className="footer_ul">
                      <li>
                        <h1 className="footer_li_title">Categories</h1>
                      </li>
                      {cardArray?.map((items) => (
                        <li
                          className="footer_li_text"
                          onClick={() => navigate(`/search/${items.id}`)}
                        >
                          <a href="#" className="footer_li_text_a">
                            {items.name}
                          </a>
                        </li>
                      ))}

                      {/* <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Journalism
                        </a>
                      </li> */}
                      {/* <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Literature
                        </a>
                      </li>
                      <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Education
                        </a>
                      </li>
                      <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Legislation
                        </a>
                      </li>
                      <li className="footer_li_text">
                        <a href="#" className="footer_li_text_a">
                          Business
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div>
                    <ul className="footer_ul">
                      <li>
                        <h1 className="footer_li_title">Company</h1>
                      </li>
                      <li className="footer_li_text_a">
                        Add: loreum epsum sit dolor, emit loreum epsum
                      </li>
                      <li className="footer_li_text_a">Tel: XXX-XXX-XXXX</li>
                      <li className="footer_li_text_a">
                        Email: support@Xyx.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="footer_hr" />
          <div className="footer_overwrite">
            <span className="footer_reserved_end">
              Copyright @ OverWrite 2022. All Rights Reserved.
            </span>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
