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
import VideocamIcon from "@mui/icons-material/Videocam";
import { answerCall, rejectCall } from "../../socketCommunication/socketConnection";
import { useDispatch, useSelector } from "react-redux";
import { clearIncomingCall, setCallAccepted } from "../../features/call/callSlice";
import {
  getLocalStream,
  createPeerConnection,
} from "../../socketCommunication/webRTCHandler";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const RingingAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#fff",
  width: theme.spacing(8),
  height: theme.spacing(8),
  margin: "0 auto",
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

function IncomingCallDialog({ open, onClose, callerName = "Unknown" }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { audioOnly, localStream } = useSelector((state) => state.call);

  const handleAnswer = async () => {
    const callData = {
      senderInfo: userInfo,
      reciver: callerName,
      type: audioOnly? "audio":"video"
    };
    answerCall(callData);
    let onlyAudio = audioOnly
    await getLocalStream(dispatch, onlyAudio , "xyz");
    
    createPeerConnection(dispatch, callData.reciver);
    dispatch(setCallAccepted());
  };

  const handleReject = () => {
    const callData = {
      senderInfo: userInfo,
      reciver: callerName,
    };
    rejectCall(callData);

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
      <DialogTitle sx={{ textAlign: "center" }}>
        {audioOnly ? "Incoming Audio Call" : "Incoming Video Call"}
      </DialogTitle>

      <DialogContent
        sx={{
          pt: "2rem !important",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RingingAvatar>
          {audioOnly ? (
            <PhoneInTalkIcon fontSize="large" />
          ) : (
            <VideocamIcon fontSize="large" />
          )}
        </RingingAvatar>

        <Typography variant="h6" sx={{ mt: 2 }}>
          {callerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {audioOnly ? "is calling you..." : "is calling you via video..."}
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
