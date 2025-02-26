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
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList"; // MUI icon
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

const SearchBarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  margin: theme.spacing(2),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(1),
}));

function UserList({ onUserSelect }) {
  const dispatch = useDispatch();
  const { users, loading, error, onlineUsers } = useSelector(
    (state) => state.admin
  );

  const { unread } = useSelector(
    (state) => state.chat
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [roleFilter, setRoleFilter] = useState("all"); 
  const [sortOrder, setSortOrder] = useState("asc");

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, roleFilter, sortOrder]);

  useEffect(() => {
    const savedRoleFilter = localStorage.getItem("roleFilter");
    const savedSortOrder = localStorage.getItem("sortOrder");

    if (savedRoleFilter) {
      setRoleFilter(savedRoleFilter);
    }
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

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

  const openFilterMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleRoleFilterChange = (newRoleFilter) => {
    setRoleFilter(newRoleFilter);
    localStorage.setItem("roleFilter", newRoleFilter);
    closeFilterMenu();
  };

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    localStorage.setItem("sortOrder", newSortOrder);
    closeFilterMenu();
  };

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch = user.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "all" || (user.role && user.role === roleFilter);

      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const nameA = a.username.toLowerCase();
      const nameB = b.username.toLowerCase();

      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleClickUser = (user) => {
    const userId = user._id || user.username;
    setSelectedUserId(userId);

    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  return (
    <UserListContainer>
      <SearchBarWrapper>
        <SearchBar
          variant="outlined"
          size="small"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          aria-label="filter"
          onClick={openFilterMenu}
          sx={{ flexShrink: 0 }}
        >
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeFilterMenu}
          keepMounted
        >
          <Typography
            sx={{ py: 1, px: 2 }}
            variant="subtitle2"
            color="text.secondary"
          >
            Filter by Role
          </Typography>
          <MenuItem
            onClick={() => handleRoleFilterChange("all")}
            selected={roleFilter === "all"}
          >
            All
          </MenuItem>
          <MenuItem
            onClick={() => handleRoleFilterChange("user")}
            selected={roleFilter === "user"}
          >
            User
          </MenuItem>
          <MenuItem
            onClick={() => handleRoleFilterChange("anonymous")}
            selected={roleFilter === "anonymous"}
          >
            Anonymous
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <Typography
            sx={{ py: 1, px: 2 }}
            variant="subtitle2"
            color="text.secondary"
          >
            Sort By Username
          </Typography>
          <MenuItem
            onClick={() => handleSortOrderChange("asc")}
            selected={sortOrder === "asc"}
          >
            Ascending
          </MenuItem>
          <MenuItem
            onClick={() => handleSortOrderChange("desc")}
            selected={sortOrder === "desc"}
          >
            Descending
          </MenuItem>
        </Menu>
      </SearchBarWrapper>

      <List sx={{ overflowY: "auto", flex: 1 }}>
        {filteredUsers.map((user) => {
          const userId = user._id || user.username;
          const isSelected = selectedUserId === userId;

          const isOnline = onlineUsers.some(
            (onlineUser) => onlineUser.userId === userId
          );
          const unreadCount =  unread.filter((msg) => msg.username === user.username).length;

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
              <Badge
                badgeContent={unreadCount > 0 ? unreadCount : 0}
                color="error"
                max={99}
                invisible={unreadCount === 0}
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Badge
                  variant="dot"
                  color="success"
                  overlap="circular"
                  invisible={!isOnline}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                </Badge>
              </Badge>

              <ListItemText
                sx={{ marginLeft: 1 }}
                primary={user.username}
                // secondary={user.role ? `Role: ${user.role}` : null}
              />
            </ListItemButton>
          );
        })}
      </List>
    </UserListContainer>
  );
}

export default UserList;
