import { Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const Cancel = styled(Button)({
  border: "1px solid #5E5E5E",
  textTransform: "capitalize",
  color: "#5E5E5E",
  fontSize: "18px",
  fontWeight: "700",
  borderRadius: "12px",
  "&:hover": {
    borderColor: "#16A34A",
    color: "#16A34A",
  },
});
const CancelBtn = (props) => {
  return (
    <>
      <Cancel variant="outlined" fullWidth {...props}>
        {props.children}
      </Cancel>
    </>
  );
};
export default CancelBtn;
