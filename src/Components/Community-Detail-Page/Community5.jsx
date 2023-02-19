import React from "react";
import "../../Assets/Css/communitydetailpage.css";
import "../../Assets/Css/owevent.css";
import Headers from "../../Components/Layouts/Headers";
import Footer from "../../Components/Layouts/Footer";
import Imagedetail from "../../Assets/images/communitydetailpage.png";
import { Button, Container, Stack, Nav, Tab } from "react-bootstrap";
import Image8 from "../../Assets/images/image-8.png";
import { addCalender, journalismAdd, threeDots } from "../../utils/svg.file";
import Rectangle8 from "../../Assets/images/rectangle 1508.png";
import Rectangle10 from "../../Assets/images/rectangle 1510.png";
import Rectangle11 from "../../Assets/images/rectangle 1511.png";
import Rectangle9 from "../../Assets/images/rectangle1509.png";
import SlickSlide from "../../Components/SlickSlide";
import ApprovedChapter from "./ApprovedChapter";
import Community6 from "./Community6";
import Community7 from "./Community7";
import Community8 from "./Community8";

const Community5 = () => {
  const communitydetailpage = [
    {
      images: Rectangle8,
      name: "Dr Cameron Williamson",
      title: "Creator",
    },
    {
      images: Rectangle9,
      name: "Dianne Russell",
      title: "Founder",
    },
    {
      images: Rectangle10,
      name: "Ralph Edwards",
      title: "Member",
    },
    {
      images: Rectangle11,
      name: "Savannah Nguyen",
      title: "Creator",
    },
  ];
  return (
    <>
      <Headers />
      <div>
        <img src={Imagedetail} className="w-100" />
      </div>
      <section>
        <Container>
          <Stack direction="horizontal" className="py-3" gap={3}>
            <div className="">
              <img src={Image8} className="communitydetailpage_img_radius" />
            </div>
            <div>
              <h2 className="communitydetailpage_heading_journalism">
                Bikers of Californiya
              </h2>
              <p className="communitydetailpage_heading_journalism_p">
                @community 1
              </p>
              <div className="d-flex align-items-center">
                <span className="communitydetailpage_Journalism_text">
                  Journalism
                </span>
                <Button
                  variant="success"
                  className="communitydetailpage_button_journalism"
                >
                  Join Now
                  <span className="communitydetailpage_addsign_button">
                    {journalismAdd}
                  </span>
                </Button>
              </div>
            </div>
            <div className="ms-auto align-items-center">
              <div className="d-flex justify-content-end">
                <i className="communitydetailpage_date_calender">
                  {addCalender}
                </i>
                <p className="communitydetailpage_date_text">
                  created on
                  <span className="communitydetailpage_date_date">
                    25 Aug 2022
                  </span>
                </p>
              </div>
              <div className="d-flex">
                <Button className="communitydetailpage_members_button">
                  200k{" "}
                  <p className="communitydetailpage_members_text">Members</p>
                </Button>
                <Button className="communitydetailpage_members_button">
                  50k <p className="communitydetailpage_members_text">Online</p>
                </Button>
              </div>
            </div>
          </Stack>
        </Container>
      </section>

      <section>
        <div className="community_detail_page">
          <Container>
            <div className="pt-4">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="community_detail_page_back">
                    <h2 className="community_detail_page_heading">
                      About Community
                    </h2>
                    <hr />
                    <p className="community_detail_page_description">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis
                      nisl ut aliquip ex ea commodo consequat. Duis autem vel
                      eum iriure dolor in hendrerit in vulputate velit esse
                      molestie consequat, vel illum dolore eu feugiat nulla
                      facilisis at vero eros et accumsan et iusto odio dignissim
                      qui blandit praesent luptatum zzril delenit augue duis
                      dolore te feugait nulla facilisi. feugiat nulla facilisis
                      at vero eros et accumsan et iusto odio dignissim qui
                      blandit praesent luptatum zzril delenit augue duis dolore
                      te feugait nulla facilisi.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="community_detail_page_back">
                    <h2 className="community_detail_page_heading">
                      About Community
                    </h2>
                    <hr />
                    {communitydetailpage.map((item) => (
                      <Stack
                        gap={3}
                        direction="horizontal"
                        className="community4_page_pp"
                      >
                        <div className="ms-3">
                          <img
                            src={item.images}
                            alt=""
                            className="img_community4_page"
                          />
                        </div>
                        <div className="">
                          <h3 className="community_detail_page_names">
                            {item.name}
                          </h3>
                          <p className="m-0 community_detail_page_title">
                            {item.title}
                          </p>
                        </div>
                      </Stack>
                    ))}
                    <p className="community4_view_all_members">
                      <a href="#" className="community_detail_page_anchor">
                        View all members
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section>
        <div className="community_detail_page">
          <h1 className="community_detail_page_heading_1">
            <span className="community_detail_page_heading_1_span">
              Community Acts
            </span>
          </h1>
          <div className="py-4">
            <div className="commity-slider">
              <SlickSlide />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Container>
            <div className="owevent_button_tab">
              <Nav variant="pills" className="">
                <Nav.Item>
                  <Nav.Link eventKey="first">Approved Chapter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Pending Chapter</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="three">Pending Chapter Edits</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="four">Chapter Removal</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Container>
          <div>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ApprovedChapter />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Community6 />
              </Tab.Pane>
              <Tab.Pane eventKey="three">
                <Community7 />
              </Tab.Pane>
              <Tab.Pane eventKey="four">
                <Community8 />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </section>
      <Footer />
    </>
  );
};

export default Community5;
