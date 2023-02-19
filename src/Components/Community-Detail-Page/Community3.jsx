import React from "react";
import "../../Assets/Css/communitydetailpage.css";
import Headers from "../../Components/Layouts/Headers";
import Footer from "../../Components/Layouts/Footer";
import Imagedetail from "../../Assets/images/communitydetailpage.png";
import { Button, Container, Stack } from "react-bootstrap";
import Image8 from "../../Assets/images/image-8.png";
import { addCalender, journalismAdd } from "../../utils/svg.file";
import Rectangle8 from "../../Assets/images/rectangle 1508.png";
import Rectangle10 from "../../Assets/images/rectangle 1510.png";
import Rectangle11 from "../../Assets/images/rectangle 1511.png";
import Rectangle9 from "../../Assets/images/rectangle1509.png";
import TextEditor from "../editor/TextEditor";
import Rectangle1512 from "../../Assets/images/Rectangle 1512.png";

const Community3 = () => {
  const paragraph = [
    {
      image: Rectangle1512,
      name: "Dianne Russell .",
      user: "@user321",
      date: "22 hr ago",
      text:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed, diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
    },
    {
      image: Rectangle1512,
      name: "Dianne Russell .",
      user: "@user321",
      date: "22 hr ago",
      text:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed, diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
    },
    {
      image: Rectangle1512,
      name: "Dianne Russell .",
      user: "@user321",
      date: "22 hr ago",
      text:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed, diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
    },
    {
      image: Rectangle1512,
      name: "Dianne Russell .",
      user: "@user321",
      date: "22 hr ago",
      text:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed, diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
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
          <Container className="ps-3">
            <h1 className="community_detail_page_heading_1 mb-3 pt-3">
              <span className="community_detail_page_heading_1_span">
                Community Discussion board
              </span>
            </h1>

            <div className="border-0">
              <TextEditor />
              {/* <div className="text-end">
                <button className="btn btn-primary">Commit</button>
              </div> */}
            </div>

            <div>
              <Stack direction="horizontal" className="py-3" gap={3}>
                <div>
                  <img src={Rectangle8} />
                </div>
                <div>
                  <h5 className="community_detail_page_heading_2">
                    Dr Cameron Williamson .
                    <span className="community_detail_page_heading_2_span">
                      22 hr ago
                    </span>
                  </h5>
                  <p className="m-0">
                    <a
                      href="#"
                      className="community_detail_page_heading_2_a_user"
                    >
                      @user321
                    </a>
                  </p>
                </div>
              </Stack>
              <p className="community_detail_page_heading_2_a">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla facilisis at vero eros et accumsan
                et iusto odio dignissim qui blandit praesent luptatum zzril
                delenit augue duis dolore te feugait nulla facilisi. feugiat
                nulla facilisis at vero eros et accumsan et iusto odio dignissim
                qui blandit praesent luptatum zzril delenit augue duis dolore te
                feugait nulla facilisi.
              </p>
            </div>
          </Container>
          <hr className="bg-secondary" />
          {paragraph.map((item) => (
            <>
              <Container className="ps-3">
                <Stack direction="horizontal" className="py-3" gap={3}>
                  <div>
                    <img src={item.image} />
                  </div>
                  <div>
                    <h5 className="community_detail_page_heading_2">
                      {item.name}
                      <span className="community_detail_page_heading_2_span">
                        {item.date}
                      </span>
                    </h5>
                    <p className="m-0">
                      <a
                        href="#"
                        className="community_detail_page_heading_2_a_user"
                      >
                        {item.user}
                      </a>
                    </p>
                  </div>
                </Stack>
                <p className="community_detail_page_heading_2_a">{item.text}</p>
              </Container>
              <hr className="m-0" />
            </>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Community3;
