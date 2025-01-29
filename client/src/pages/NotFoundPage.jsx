import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Typography variant="h1" color="primary.main" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Oops! The page you're looking for doesn't exist or was moved.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{
          mt: 2,
          backgroundColor: "primary.main",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#d81b60",
          },
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
