// ChatLayout.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import { Box } from "@mui/material";
import BurgerMenu from "../components/nav/BurgerMenu";
import { useDispatch } from "react-redux";
import {setChosenChatUser} from "../features/chat/chatSlice";
import {fetchUserDataByUsername} from "../api/userApi";




const ChatLayout = () => {
  // Grab the "username" from the route params
 const dispatch = useDispatch();
 const { username } = useParams();

//  useEffect(() => {
//     const validateAndSetUser = async () => {
//       try {
//         const userData = await fetchUserDataByUsername(username);
//         if (userData?.username === username) {
//           dispatch(setChosenChatUser(userData));
//         } else {
//           dispatch(setError("User not found or username mismatch."));
//         }
//       } catch (error) {
//         dispatch(setError("An error occurred while fetching user data."));
//       }
//     };

//     validateAndSetUser();
//   }, [dispatch, username]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Header */}
      <ChatHeader
        // Dynamically show which user is being chatted with
        title={`Chat with ${username}`}
        leftIcon={<BurgerMenu />}
      />

      {/* Chat Content */}
      <Box
        sx={{
          px: { xs: 16, md: 30 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8f8f8",
        }}
      >
        {/* Pass the username to ChatWindow or handle it here */}
        <ChatWindow username={username} />
      </Box>
    </Box>
  );
};

export default ChatLayout;
