import React from 'react';
import ChatHeader from '../components/chat/ChatHeader';
import ChatWindow from '../components/chat/ChatWindow';
import { Box } from '@mui/material';
import BurgerMenu from '../components/nav/BurgerMenu';

const ChatLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Header */}
      <ChatHeader
        title="Chat with Admin"
        leftIcon={<BurgerMenu />}
      />

      {/* Chat Content */}
      <Box
        sx={{
          // Increase horizontal padding for more space
          px: { xs: 16, md: 30 }, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8f8f8',
        }}
      >
        <ChatWindow />
      </Box>
    </Box>
  );
};

export default ChatLayout;
