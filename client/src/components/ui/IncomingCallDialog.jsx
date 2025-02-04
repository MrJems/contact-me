import React, { forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { answerCall, rejectCall } from "../../socketCommunication/socketConnection";


// 1. Slide-down transition component
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// 2. Create a pulsing Avatar using keyframes
const RingingAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#fff",
  width: theme.spacing(8),
  height: theme.spacing(8),
  margin: "0 auto",
  // Start with no "ring"
  boxShadow: `0 0 0 0 ${theme.palette.error.main}`,
  animation: "pulseRing 1.5s infinite",
  "@keyframes pulseRing": {
    "0%": {
      transform: "scale(0.95)",
      boxShadow: `0 0 0 0 ${theme.palette.error.main}`,
    },
    "70%": {
      transform: "scale(1)",
      boxShadow: `0 0 0 20px rgba(229,57,53,0)`,
    },
    "100%": {
      transform: "scale(0.95)",
      boxShadow: `0 0 0 0 ${theme.palette.error.main}`,
    },
  },
}));

function IncomingCallDialog({
  open,
  onClose,
  callerName = "John Doe",
}) {


  const handleAnswer = () => {
    // 1. Emit socket event to server
    answerCall(callData);

    // 2. Optionally close dialog immediately
    //    or wait for server to confirm call started
    dispatch(clearIncomingCall());
  };

  const handleReject = () => {
    // 1. Emit socket event to server
    rejectCall(callData);

    // 2. Close dialog
    dispatch(clearIncomingCall());
  };

  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          py: 2,
          px: 2,
          minWidth: 300,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>Incoming Call</DialogTitle>

      <DialogContent
        sx={{
          pt: "2rem !important",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RingingAvatar>
          <PhoneInTalkIcon fontSize="large" />
        </RingingAvatar>

        <Typography variant="h6" sx={{ mt: 2 }}>
          {callerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          is calling you...
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
        <Button onClick={handleReject} variant="outlined" color="error">
          Reject
        </Button>
        <Button onClick={handleAnswer} variant="contained" color="success">
          Answer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default IncomingCallDialog;
