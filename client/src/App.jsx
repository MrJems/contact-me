import React, { useEffect, useState } from "react";

import NotFoundPage from "./pages/NotFoundPage";
import AuthGuard from "./components/auth/AuthGuard";
import ChatPage from "./pages/ChatPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RoleRouter from "./components/auth/RoleRouter";

import { fetchHomeData } from "./api/homeApi";
import { initializeApp } from "./features/user/userSlice";
import { setUserInfo  } from "./features/user/userSlice";
import { connectWithSocketServer } from "./socketCommunication/socketConnection";

function App() {
  const dispatch = useDispatch();
  const {token, anonymousId, userInfo } = useSelector((state) => state.user);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [socketInitialized, setSocketInitialized] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    dispatch(initializeApp());
    const initializeAppData = async () => {
      try {
        const data = await fetchHomeData();     
        dispatch(setUserInfo(data.userInfo));
        console.log("intital data : ", data)
        setInitialDataLoaded(true);
      } catch (err) {
        
        console.log("failed to load")
        setError("Failed to load initial data");
        setInitialDataLoaded(true);
        localStorage.clear();
      }
    };

    initializeAppData();

    // if ((token && !anonymousId) || (!token && anonymousId)) {
    //   connectWithSocketServer({ token, anonymousId });
    // }

  }, [token,error, anonymousId, dispatch]);

  useEffect(() => {
    if (!error && initialDataLoaded && !socketInitialized) {
      if ((token && !anonymousId) || (!token && anonymousId)) {
        connectWithSocketServer({ token, anonymousId, userInfo }, dispatch);
        setSocketInitialized(true);
      }
    }
  }, [error, initialDataLoaded, token, anonymousId, socketInitialized]);

  if (!initialDataLoaded) {
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

  if (error) {
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
          {error}
        </Alert>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rosybrown",
            color: "#fff",
          }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleRouter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/user/:username"
          element={
            <AuthGuard>
              <ChatPage />
            </AuthGuard>
          }
        /> <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/user/:username" element={<ChatPage />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;
