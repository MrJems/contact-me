import React from "react";
import { Box, Alert, Button } from "@mui/material";

function ErrorScreen({ errorMessage, onRetry }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#fdf2f2",
        padding: "1rem",
      }}
    >
      <Alert
        severity="error"
        sx={{
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "1rem",
          color: "#b71c1c",
          backgroundColor: "#ffebee",
        }}
      >
        {errorMessage}
      </Alert>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "rosybrown",
          color: "#fff",
        }}
        onClick={onRetry}
      >
        Retry
      </Button>
    </Box>
  );
}

export default ErrorScreen;
