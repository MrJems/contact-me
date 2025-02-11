import React, { useRef, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/ui/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
import {
  sendDirectMessage,
  getChatHistory,
} from "../socketCommunication/socketConnection";
import { setChosenChatUser } from "../features/chat/chatSlice";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

const MessagesWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
}));

const transformMessages = (data, userInfo) => {
  if (!data) return [];
  return data.map((msg, index) => ({
    id: (index + 1).toString(),
    text: msg.content,
    sender: msg.author.username === userInfo?.username ? "me" : "other",
  }));
};

function ChatPage({ selectedUser }) {
  const dispatch = useDispatch();
  const { userInfo, socketConnected  } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);

  const username = selectedUser?.username || "admin";

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (username && userInfo?.username && socketConnected) {

      dispatch(setChosenChatUser(username));
      getChatHistory({
        reciver: username,
        sender: userInfo.username,
        senderId: userInfo.userID
      });
    }
  }, [username, userInfo, socketConnected, dispatch]);

  const formattedMessages = useMemo(() => {
    return transformMessages(messages, userInfo);
  }, [messages, userInfo]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formattedMessages]);

  const handleSend = (text) => {
    if (!text.trim()) return; 
    
    sendDirectMessage({
      reciver: username,
      sender: userInfo?.username,
      text,
    });
  };

  return (
    <ChatContainer>
      <ChatHeader username={username} />
      <MessagesWrapper>
        {formattedMessages.map((m) => (
          <MessageBubble
            key={m.id}
            text={m.text}
            isSentByMe={m.sender === "me"}
          />
        ))}
        <div ref={messagesEndRef} />
      </MessagesWrapper>
      <ChatInput onSend={handleSend} />
    </ChatContainer>
  );
}

export default ChatPage;
