import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Container,
  Avatar,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/admindata/adminSlice";
import { logoutUser } from "../features/user/userSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, message, admin } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Navigate to user-specific chat page
  const handleUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="secondary.main"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="secondary.main"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        minHeight: "100vh",
      }}
    >
      {/* Header with Logout Button */}
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold" }}
        >
          {message}
        </Typography>
        {admin ? (
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.default",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <List sx={{ maxHeight: "70vh", overflowY: "auto" }}>
              {users.map((user, index) => (
                <ListItem
                  key={index}
                  // button
                  onClick={() => handleUserClick(user.username)}
                  sx={{
                    mb: 2,
                    bgcolor: "primary.light",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "primary.dark",
                      color: "white",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      bgcolor: "primary.main",
                      color: "white",
                    }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {user.username}
                      </Typography>
                    }
                    secondary={`Role: ${user.role}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography variant="h6" color="error" textAlign="center">
            Access Denied: Admin Privileges Required
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default AdminHomePage;
