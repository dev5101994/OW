import { Button } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Event1 from "../../../../Assets/images/event1.png";
import { Base_URL, CHAPTERIMG_URL } from "../../../../utils/serverUrl";
import axios from "axios";
import { useEffect } from "react";
const UploadFile = styled(Button)({
  background: "rgba(216, 222, 233, 0.2)",
  border: " 2px dashed #C4C4C4",
  borderRadius: "24px",
  color: "#465BBA",
  padding: 15,
  textTransform: "capitalize",
});
const RemoveChapter = ({ setIsSubmitting, isSubmitting, chapterid }) => {
  const chapterId = chapterid;
  console.log(chapterId, "removal chapter");
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token?.replace(/^"(.+)"$/, "$1");
  const [chapterdata, setChapterdata] = React.useState([]);
  const [communitydata, setCommunitydata] = React.useState([]);
  const [chapterdes, setChapterdescription] = React.useState();

  const removalchapter = () => {
    var data = new FormData();
    data.append("id", chapterId);
    var config = {
      method: "post",
      url: `${Base_URL}edit-chapter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response, "removal chapter data");
        setCommunitydata(response.data.community);
        setChapterdata(response.data.data);

        console.log(chapterdata, "removalchapterdata");
        console.log(communitydata, "removalcommunitydata");
        // setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    removalchapter();
  }, []);

  const handleSubmit = () => {
    var data = new FormData();
    data.append("id", chapterId);
    data.append("message", chapterdes);
    var config = {
      method: "post",
      url: `${Base_URL}removeChapter`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response, "removal chapter");
        // setCommunitydata(response.data.community);
        // setChapterdata(response.data.data);

        // console.log(chapterdata, "removalchapterdata");
        // console.log(communitydata, "removalcommunitydata");
        // setIsSubmitting(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isSubmitting) {
      handleSubmit();
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return (
    <>
      <div className="py-3">
        <Form>
          <Form.Group>
            <div className="editchapter-text">
              <h1>{chapterdata.chapter_name}</h1>
              {/* Bikers of Californiys */}
              <span>@{communitydata.title}</span>
              {/* @community 1 */}
              <img
                src={
                  chapterdata
                    ? `${CHAPTERIMG_URL}${chapterdata.images}`
                    : Event1
                }
                alt="img"
              />
              <p>
                {chapterdata.description}
                {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad. */}
              </p>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <textarea
              className="textareabox removetextarea"
              placeholder="Description"
              onChange={(e) => {
                setChapterdescription(e.target.value);
              }}
            ></textarea>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
export default RemoveChapter;
