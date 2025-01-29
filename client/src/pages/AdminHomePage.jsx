import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import UserList from "../components/chat/UserList";
import ChatLayout from "../layouts/ChatLayout";

const AdminHomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  if (isDesktop) {
    return (
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ width: "30%", minWidth: 300 }}> 
          <UserList onUserSelect={handleUserSelect} />
        </Box>

        <Box sx={{ flex: 1 }}>
          {selectedUser ? (
            <ChatLayout selectedUser={selectedUser} />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Select a user to start chatting</h3>
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  if (!selectedUser) {
    return (
      <Box sx={{ height: "100vh" }}>
        <UserList onUserSelect={handleUserSelect} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <ChatLayout selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
    </Box>
  );
};

export default AdminHomePage;
