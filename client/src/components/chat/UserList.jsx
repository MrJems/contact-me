import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/admindata/adminSlice";

const UserListContainer = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2),
}));

function UserList({ onUserSelect }) {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <UserListContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      </UserListContainer>
    );
  }

  if (error) {
    return (
      <UserListContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            p: 2,
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </UserListContainer>
    );
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickUser = (user) => {
    const userId = user._id || user.username; 
    setSelectedUserId(userId);

    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  return (
    <UserListContainer>
      <SearchBar
        variant="outlined"
        size="small"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <List sx={{ overflowY: "auto", flex: 1 }}>
        {filteredUsers.map((user) => {
          const userId = user._id || user.username;
          const isSelected = selectedUserId === userId;

          return (
            <ListItemButton
              key={userId}
              onClick={() => handleClickUser(user)}
              selected={isSelected}
              sx={(theme) => ({
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                },
                "&.Mui-selected:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              })}
            >
              <Avatar sx={{ marginRight: 1 }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>

              <ListItemText
                primary={user.username}
                secondary={user.role ? `Role: ${user.role}` : null}
              />
            </ListItemButton>
          );
        })}
      </List>
    </UserListContainer>
  );
}

export default UserList;
