
import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/ui/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
import UserList from "../components/chat/UserList";


const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

const MessagesWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

function ChatPage({ selectedUser }) {
  const {userInfo } = useSelector((state) => state.user);
  const username = selectedUser?.username || userInfo.username;

  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "other" },
    { id: "2", text: "Hi, how are you?", sender: "me" },
  ]);

  const handleSend = (msg) => {
    const newMessage = {
      id: String(Date.now()),
      text: msg,
      sender: "me",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContainer>
      <ChatHeader username={username} />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", marginLeft:"2vw", marginRight:"2vw" }}>
        <MessagesWrapper>
          {messages.map((m) => (
            <MessageBubble key={m.id} text={m.text} isSentByMe={m.sender === "me"} />
          ))}
        </MessagesWrapper>

        <ChatInput onSend={handleSend} />
      </Box>
    </ChatContainer>
  );
}

export default ChatPage;
