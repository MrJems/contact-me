import React, { useState, useEffect } from "react";
import { 
  Box, 
  Avatar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem,
  CircularProgress,
  Fade
} from "@mui/material";
import { 
  Videocam, 
  Call, 
  MoreVert,
  CallEnd,
  PhoneInTalk 
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { logoutUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {initiateCall, endCall} from "../../socketCommunication/socketConnection";
import { setCallStatus, setLocalStream } from "../../features/call/callSlice";



const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

const LeftSection = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const RightSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  marginRight: theme.spacing(1),
}));

function ChatHeader({ username }) {
  const initial = (username && username[0]?.toUpperCase()) || "U";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo} = useSelector(state => state.user);
  const { callStatus, incomingCallData, outgoingCallData, localStream } = useSelector((state) => state.call);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (callStatus === "rejected") {
      setFadeOut(true);

      const timer = setTimeout(() => {
        dispatch(setCallStatus("idle"));
        setFadeOut(false);
      }, 10);

      return () => clearTimeout(timer);
    }

    if(callStatus === "idle") {

      if(localStream) {
           localStream.getTracks().forEach(track => track.stop())
           dispatch(setLocalStream(null))
          }
     }
  
     
  }, [callStatus, localStream,  dispatch]);

  useEffect(() => {
    let timer;
    if (callStatus === "outgoing") {
      timer = setTimeout(() => {
        if (callStatus === "outgoing") {
          handleEndCall();
        }
      }, 60000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [callStatus]);


  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login");
  };

  const handleRegister = () => {
    handleMenuClose();
    navigate("/register");
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleCall = (type = "audio") => {
    const callData = {
      senderInfo : userInfo,
      reciver: username,
      type,
    }
    initiateCall(callData, dispatch)
  };

  const handleEndCall = () => {
    const callData = {
      senderInfo : userInfo,
      reciver: username
    }
    endCall(callData, dispatch)
  };


  if (callStatus === "outgoing" || callStatus === "rejected") {

    return (
      <Fade in={!fadeOut} timeout={500}>
        <HeaderContainer sx={{ backgroundColor: "#D81B60", color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress color="inherit" size={24} />
            <Typography variant="subtitle1">
              {callStatus === "outgoing"
                ? `Calling ${outgoingCallData.reciver || "User"}...`
                : "Call Rejected..."}
            </Typography>
          </Box>

          {callStatus === "outgoing" && (
            <IconButton color="inherit" onClick={handleEndCall}>
              <CallEnd />
            </IconButton>
          )}
        </HeaderContainer>
      </Fade>
    );
  }

  if (callStatus === "accepted") {
    return (
      <HeaderContainer sx={{ backgroundColor: "#4CAF50", color: "#fff" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PhoneInTalk />
        <Typography variant="subtitle1">
          In call with <strong>{incomingCallData?.userName || "admin"}</strong>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        
        <IconButton color="inherit" onClick={handleEndCall}>
          <CallEnd />
        </IconButton>
      </Box>
    </HeaderContainer>

    );
  }

  return (
    <HeaderContainer>
      <LeftSection>
        <StyledAvatar>{initial}</StyledAvatar>
        <Typography variant="subtitle1">{username == "admin"? "Telar Karan": username}</Typography>
      </LeftSection>

      <RightSection>
        <IconButton color="primary" onClick={() => handleCall("video")}>
          <Videocam />
        </IconButton>
        <IconButton color="primary" onClick={() => handleCall("audio")}>
          <Call />
        </IconButton>
        
        <IconButton color="primary" onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={handleRegister}>Register</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </RightSection>
    </HeaderContainer>
  );
}

export default ChatHeader;
