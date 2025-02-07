import React from "react";

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const BubbleContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSentByMe", 
})(({ theme, isSentByMe }) => ({
  display: "flex",
  justifyContent: isSentByMe ? "flex-end" : "flex-start",
  margin: theme.spacing(1, 0),
}));

const Bubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSentByMe", 
})(({ theme, isSentByMe }) => ({
  maxWidth: "60%",
  padding: theme.spacing(1, 2),
  borderRadius: 16,
  backgroundColor: isSentByMe ? theme.palette.primary.main : theme.palette.grey[300],
  color: isSentByMe ? "#fff" : "#000",
}));


function MessageBubble({ text, isSentByMe }) {
  return (
    <BubbleContainer isSentByMe={isSentByMe}>
      <Bubble isSentByMe={isSentByMe}>
        {text}
      </Bubble>
    </BubbleContainer>
  );
}


export default MessageBubble;
