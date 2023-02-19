import React from "react";
import "../Assets/Css/showchapter.css";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Layouts/Footer";
import Headers from "./Layouts/Headers";
import { SideLeft, SideRight } from "../utils/svg.file";
import showChapter from "../Assets/images/show-chapter.png";

const ShowChapter = () => {
  return (
    <>
      <Headers />
      <Container>
        <div className="">
          <p className="showchapter_first_section_p">
            <Link to="#" className="showchapter_first_section_link">
              {SideRight} Back to Community
            </Link>
          </p>
        </div>
      </Container>
      <div className="show_chapter">
        <Container>
          <Stack direction="horizontal" gap={3}>
            <div className="show_chapter_btn">
              <Button className="showchapter_btn">
                {SideRight} Previous Chapter
              </Button>
            </div>
            <div className="m-auto">
              <h3 className="showchapter_middle_heading">
                Death Becomes Her: Drag Ghost Tours{" "}
              </h3>
            </div>
            <div className="show_chapter_btn">
              <Button className="showchapter_btn">
                Next Chapter {SideLeft}
              </Button>
            </div>
          </Stack>

          <div className="">
            <h3 className="showchapter_title">
              Andrew jhonson | September 08, 2022
            </h3>
            <div className="showchapter_image">
              <img src={showChapter} className="me-auto" />
            </div>
            <p className="showchapter_text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugait nulla
              facilisi.
            </p>
            <p className="showchapter_text_p">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugait nulla
              facilisi.
            </p>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ShowChapter;
