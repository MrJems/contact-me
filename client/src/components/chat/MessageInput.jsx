import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendOutlined from '@mui/icons-material/Send';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
        borderTop: '1px solid #ccc',
      }}
    >
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        fullWidth
        size="small"
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendOutlined sx={{ fontSize: '36px' }} />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
