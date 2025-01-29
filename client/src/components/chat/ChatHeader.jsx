import React, { useState } from "react";
import { Box, Avatar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Videocam, Call, MoreVert } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { logoutUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <HeaderContainer>
      <LeftSection>
        <StyledAvatar>{initial}</StyledAvatar>
        <Typography variant="subtitle1">{username}</Typography>
      </LeftSection>

      <RightSection>
        <IconButton color="primary">
          <Videocam />
        </IconButton>
        <IconButton color="primary">
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
