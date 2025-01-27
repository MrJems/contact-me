import React from 'react';
import { Box, Typography } from '@mui/material';

const MessageBubble = ({ message }) => {
  const isAdmin = message.sender === 'admin';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isAdmin ? 'flex-start' : 'flex-end',
        marginBottom: '0.5rem',
      }}
    >
      <Box
        sx={{
          maxWidth: '70%',
          padding: '0.75rem 1rem',
          borderRadius: '12px',
          backgroundColor: isAdmin ? '#ddd' : 'red', // or theme.palette.primary.main
          color: isAdmin ? '#000' : '#fff',
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {message.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
