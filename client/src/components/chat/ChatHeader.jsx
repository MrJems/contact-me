import React, { useState } from "react";
import { 
  Box, 
  Avatar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem,
  CircularProgress 
} from "@mui/material";
import { 
  Videocam, 
  Call, 
  MoreVert,
  CallEnd 
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { logoutUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {initiateCall, endCall} from "../../socketCommunication/socketConnection";


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

  // STATE to handle menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // STATE to handle call
  const [isCalling, setIsCalling] = useState(false);

  // Menu handlers
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

  // Call handlers
  const handleCall = () => {
    const callData = {
      senderInfo : userInfo,
      reciver: username
    }
    initiateCall(callData)
    setIsCalling(true);
  };

  const handleEndCall = () => {
    const callData = {
      senderInfo : userInfo,
      reciver: username
    }
    endCall(callData)
    setIsCalling(false);
  };

  // If a call is in progress, show a "calling" sub-header
  if (isCalling) {
    return (
      <HeaderContainer
        sx={{
          // Example rose-red background
          backgroundColor: "#D81B60", 
          color: "white",
        }}
      >
        {/* Left: small “Ringing” indicator with spinner */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CircularProgress color="inherit" size={24} />
          <Typography variant="subtitle1">
            Calling {username || "User"}...
          </Typography>
        </Box>

        {/* Right: End call button */}
        <IconButton color="inherit" onClick={handleEndCall}>
          <CallEnd />
        </IconButton>
      </HeaderContainer>
    );
  }

  // Otherwise, show the normal header UI
  return (
    <HeaderContainer>
      <LeftSection>
        <StyledAvatar>{initial}</StyledAvatar>
        <Typography variant="subtitle1">{username == "admin"? "Telar Karan": username}</Typography>
      </LeftSection>

      <RightSection>
        <IconButton color="primary">
          <Videocam />
        </IconButton>
        <IconButton color="primary" onClick={handleCall}>
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
