import React from "react";
import { Box, CircularProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="secondary.main"
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
