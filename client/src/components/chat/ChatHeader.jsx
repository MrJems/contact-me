import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const ChatHeader = ({ title, leftIcon, rightIcon }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Render leftIcon as-is */}
        {leftIcon}

        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {title}
        </Typography>

        {/* Render rightIcon as-is */}
        {rightIcon}
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
