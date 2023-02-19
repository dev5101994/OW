import React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack } from "@mui/material";

import CancelBtn from "../../cancelbutton";
import PrimaryButton from "../../cancelbutton/primarybutton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        px: 2,
        py: 1,
        color: "#16A34A",
        borderBottom: "1px solid #ccc",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ViewModal = (props) => {
  return (
    <>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        scroll="body"
      >
        <Box sx={{ width: "400px" }}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.onCancle}
          >
            {props.title}
          </BootstrapDialogTitle>
          <DialogContent>
            {props.content}

            <Stack direction="row" spacing={2} justifyContent="space-between">
              <CancelBtn onClick={props.onCancle}>{props.cancleText}</CancelBtn>
              <PrimaryButton
                variant="contained"
                fullWidth
                onClick={() => {
                  props.onSubmit();
                }}
              >
                {props.submitText}
              </PrimaryButton>
            </Stack>
          </DialogContent>
        </Box>
      </BootstrapDialog>
    </>
  );
};
export default ViewModal;
