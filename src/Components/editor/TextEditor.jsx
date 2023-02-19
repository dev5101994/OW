import React from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import MUIRichTextEditor from "mui-rte";
import { useRef } from "react";
import { useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { Base_URL } from "../../utils/serverUrl";

// const myTheme = createTheme();

// Object.assign(myTheme, {
//   overrides: {
//     MUIRichTextEditor: {
//       root: {
//         width: "100%",
//         minHeight: "300px",
//         border: "1px solid #ccc",
//         borderRadius: "5px",
//         background: "#fff",
//         marginBottom: "15px",
//       },
//       toolbar: { borderBottom: "1px solid #ccc" },
//       placeHolder: { position: "relative", padding: "0px 10px 8px 10px" },
//       editor: {
//         padding: "0px 10px 8px 10px",
//       },
//     },
//   },
// });

const TextEditor = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const community_id = props.community_id;
  let token = localStorage.getItem("userToken");
  let isLoggedIn = token.replace(/^"(.+)"$/, "$1");
  let userid = localStorage.getItem("userId");

  const disscussion = () => {
    var data = new FormData();
    data.append("community_id", community_id);
    data.append("user_id", userid);
    data.append("discussion", content);

    var config = {
      method: "post",
      url: `${Base_URL}adddisscussion`,
      headers: {
        Authorization: "Bearer " + isLoggedIn,
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data, "tfetydhgev");
        setContent("");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const config = {
    // readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    placeholder: "Start typings...",
    background: "#ffffff",
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={content}
        // config={config}
        // tabIndex={1} // tabIndex of textarea
        // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newcontent) => setContent(newcontent)}
      />
      <div className="text-end position-relative">
        <button className="btn btn-primary commnet" onClick={disscussion}>
          Comment
        </button>
      </div>
      {/* <ThemeProvider theme={myTheme}>
        <MUIRichTextEditor label="Start typing..." />
      </ThemeProvider> */}
    </>
  );
};
export default TextEditor;
