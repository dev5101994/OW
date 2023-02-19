import { Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const Bgcolor = styled(Button)({
  border: "0px",
  textTransform: "capitalize",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "700",
  borderRadius: "12px",
  background: "#16A34A",
  "&:hover": {
    color: "#fff",
    background: "#308b52",
  },
});
const PrimaryButton = (props) => {
  // console.log({ props });

  return (
    <>
      <Bgcolor fullWidth {...props}>
        {props.children}
      </Bgcolor>
    </>
  );
};
export default PrimaryButton;
