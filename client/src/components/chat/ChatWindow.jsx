import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import {sendDirectMessage} from '../../socketCommunication/socketConnection';


const mockMessages = [
  { id: 1, sender: 'admin', text: 'Hello, how ca I help you?' },
  { id: 2, sender: 'user', text: 'I have a question about my order.' },
  { id: 3, sender: 'user', text: 'I have a question about my order.' },
];

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      reciver: "admin",
      sender: user ? user.username : 'user',
      text,
    };
if(text.length > 0){
  sendDirectMessage(newMessage)
}
    
    // setMessages([...messages, newMessage]);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f8f8',
      }}
    >
      <Box sx={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {messages.map((msg) => {
         return <MessageBubble key={msg.id} message={msg} />}
         
        )}
      </Box>
    
      <MessageInput onSend={handleSendMessage} />
    </Box>
  );
};

export default ChatWindow;
