import React from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
// import Downarrow from "../../Assets/Images/downarrow.png";
import Chatimage from "../../Assets/images/image-8.png";
import LinkDropdown from "react-bootstrap/NavDropdown";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <Navbar className="header_navbar_chat" expand="lg">
          <Container>
            <Navbar.Brand href="/" className="header_navbar_brand">
              OW
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form className="d-flex">
                <div className="header_search_input_chat d-lg-block d-md-block d-none">
                  <Form.Control
                    type="search"
                    placeholder="Community 1"
                    aria-label="Search"
                  />
                  <AiOutlineSearch className="header_search_icon" />
                </div>
              </Form>
              <Nav className=" ms-auto header_navbar_menu align-items-center">
                <Link
                  to="/dashboard"
                  className="header_navbar_link_chat nav-link"
                >
                  Home
                </Link>
                <LinkDropdown
                  title="My communities"
                  id="basic-nav-dropdown"
                  className="header_navbar_dropdown_chat"
                >
                  <LinkDropdown.Item
                    to="/mycommunities"
                    className="header_navbar_dropdown_chat"
                  >
                    COMMUNITY
                  </LinkDropdown.Item>
                  <LinkDropdown.Item
                    to="#"
                    className="header_navbar_dropdown_chat"
                  >
                    My Communities
                  </LinkDropdown.Item>
                  <LinkDropdown.Item
                    to="#"
                    className="header_navbar_dropdown_chat"
                  >
                    Create Communities
                  </LinkDropdown.Item>
                </LinkDropdown>
                <Link
                  to="/chat"
                  className="header_navbar_link_chat nav-link  message_icon"
                >
                  Messages
                </Link>
                <span className="mess_number">5</span>
                <Link
                  to="/mycommunities"
                  className="header_navbar_link_chat nav-link"
                >
                  Invites
                </Link>

                <div className="modal_fleg">
                  <div className="modal_in">
                    <FaRegBell className="bell_icon" />
                    <span className="badge">3</span>
                  </div>
                </div>
                <LinkDropdown
                  title={
                    <img src={Chatimage} alt="" className="header_navbar_img" />
                  }
                  id="basic-nav-dropdown"
                  className="header_navbar_dropdown_chat link_drop_img"
                ></LinkDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
