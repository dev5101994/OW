import React, { Fragment } from "react";
import "../Assets/Css/admin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import Rectangle1511 from "../Assets/images/rectangle 1511.png";

const Admin = ({ children }) => {
  let navigate = useNavigate();
  // console.log({ children });
  const [onClick, setOnClick] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const closeButton = () => setIsOpen(false);

  const closeSubmenu = (key) => setOnClick(key === onClick ? null : key);
  const menuItem = [
    {
      path: "/cadhfhkf",
      name: "Category",
      iconOpen: <AiOutlineDown />,

      subItem: [
        {
          path: "/category/categorylist",
          name: "Category List",
        },
      ],
    },
    {
      path: "/user",
      name: "User",
    },
    {
      path: "/acts",
      name: "Acts",
    },
    {
      path: "/chapters",
      name: "Chapters",
    },
    {
      path: "/communities",
      name: "Communities",
    },

    {
      path: "/aboutUs",
      name: "AboutUs",
    },
    // {
    //   path: "/termsofuse",
    //   name: "Terms Of Use",
    // },
    {
      path: "/contactus",
      name: "Contact Us",
    },
    {
      path: "/settings",
      name: "Setting",
    },
    {
      path: "/addads",
      name: "Add ad",
    },
    // {
    //   path: "/googleadds",
    //   name: "Google Adds",
    // },
  ];
  return (
    <>
      <div className="header">
        <div className="ms-auto d-lg-block d-md-block d-none">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline"
              id="dropdown-basic"
              className="header_sidebar_dropdown"
            >
              <img src={Rectangle1511} alt="" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/adminprofile")}>
                Profile
              </Dropdown.Item>
              {/* <hr className="m-0" /> */}
              {/* <Dropdown.Item href="#/action-2">Forgot Password</Dropdown.Item> */}
              <hr className="m-0" />
              <Dropdown.Item
                onClick={() => {
                  localStorage.clear();
                  navigate("/adminlogin");
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="bars" style={{ marginLeft: isOpen ? "10px" : "10px" }}>
          <FaBars onClick={toggle} className="d-lg-none d-md-none d-block" />
        </div>
      </div>

      <div className="combind">
        <div className={`sidebar ${isOpen ? "mobileview" : "destopview"}`}>
          <div className="sidebar_img_icon">
            <h1 className="sidebar_head">OW</h1>
            <AiOutlineClose
              className="sidebar_close_button"
              onClick={closeButton}
            />
          </div>
          {menuItem.map((item, index) => (
            <Fragment key={index}>
              <NavLink to={item.path} key={index} className="link">
                <div
                  className="link_text"
                  onClick={() => closeSubmenu(item.name)}
                >
                  <div className="sidebar_category">
                    {item.name}

                    <div
                      className="item_icon"
                      style={{
                        transform:
                          onClick === item.name
                            ? "rotate(360deg)"
                            : "rotate(-90deg)",
                      }}
                    >
                      {item.iconOpen}
                    </div>
                  </div>
                </div>
              </NavLink>

              <>
                <ul className="sidebar_sub_menu">
                  {item.subItem?.map((items, subindex) => {
                    return (
                      <li
                        style={{
                          display: onClick === item.name ? "block" : "none",
                        }}
                        className="submenu_li"
                        key={subindex}
                      >
                        <NavLink
                          to={items.path}
                          className="sub_test"
                          activeclassname="active"
                        >
                          {items.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </>
            </Fragment>
          ))}
       
        </div>

        <div className="contain">{children}</div>
      </div>
    </>
  );
};

export default Admin;
