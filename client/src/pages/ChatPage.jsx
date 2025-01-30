import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/ui/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";

/** 
 * Outer container: flex column, fills parent's height, 
 * so the header is pinned at the top and the input can be pinned at the bottom.
 */
const ChatContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%", // must fill parent's height
  border: `1px solid ${theme.palette.grey[300]}`,
}));

/** 
 * The middle area that holds messages and scrolls. 
 * "flex: 1" means it expands to fill available space between header & input.
 */
const MessagesWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  // optional padding for spacing:
  padding: theme.spacing(2),
}));

function ChatPage({ selectedUser }) {
  // 1) We'll pull userInfo from Redux
  const { userInfo } = useSelector((state) => state.user);

  // 2) Determine the username to display in the header
  const username = selectedUser?.username || userInfo?.username || "Unknown User";

  // 3) Example local messages
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "other" },
    { id: "2", text: "Hi, how are you?", sender: "me" },
  ]);

  // 4) A ref for auto-scrolling to the last message
  const messagesEndRef = useRef(null);

  // 5) Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 6) Handle sending a new message
  const handleSend = (text) => {
    const newMessage = {
      id: String(Date.now()),
      text,
      sender: "me",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <ChatContainer>
      {/* HEADER: pinned at the top */}
      <ChatHeader username={username} />

      {/* MESSAGES + SCROLL AREA */}
      <MessagesWrapper>
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            text={m.text}
            isSentByMe={m.sender === "me"}
          />
        ))}
        {/* A dummy div that we scroll into view to ensure latest message is visible */}
        <div ref={messagesEndRef} />
      </MessagesWrapper>

      {/* INPUT: pinned at the bottom (below the scrollable messages) */}
      <ChatInput onSend={handleSend} />
    </ChatContainer>
  );
}

export default ChatPage;
