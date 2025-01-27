import React from "react";
import { useSelector } from "react-redux";
import AdminHomePage from "../../pages/AdminHomePage";
import UserHomePage from "../../pages/UserHomePage";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const RoleRouter = () => {
  const role = useSelector((state) => state.user.userInfo?.role);
console.log("role", role)
  if (role === "admin") {
    return <AdminHomePage />;
  } else if (role === "user") {
    return <UserHomePage />;
  }else if(role === "anonymous") {
    return <UserHomePage />;
  }else {
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
};

export default RoleRouter;
