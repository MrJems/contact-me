// layouts/ChatLayout.jsx
import React from "react";
import { Box } from "@mui/material";
import ChatPage from "../pages/ChatPage";

const ChatLayout = ({ selectedUser, onBack }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* You could have a custom "Back" button on mobile if you want:
        {onBack && (
          <button onClick={onBack} style={{ width: 80, height: 40 }}>
            Back
          </button>
        )}
      */}

      {/* We pass the selectedUser to ChatPage so it knows who we're chatting with */}
      <ChatPage selectedUser={selectedUser} />
    </Box>
  );
};

export default ChatLayout;
