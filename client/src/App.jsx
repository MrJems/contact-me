import  { clearIncomingCall, setLocalStream } from './features/call/callSlice'


import CallWindow from './components/ui/CallWindow';

import React, { useEffect, useState } from "react";
import ErrorScreen from "./components/ui/ErrorScreen";
import LoadingScreen from "./components/ui/LoadingScreen";
import IncomingCallDialog from "./components/ui/IncomingCallDialog";
import NotFoundPage from "./pages/NotFoundPage";
import AuthGuard from "./components/auth/AuthGuard";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RoleRouter from "./components/auth/RoleRouter";

import { fetchHomeData } from "./api/homeApi";
import { initializeApp, setUserInfo } from "./features/user/userSlice";
import { connectWithSocketServer } from "./socketCommunication/socketConnection";

function App() {
  const dispatch = useDispatch();
  const { token, anonymousId, userInfo } = useSelector((state) => state.user);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [showIncomingCallPopup, setShowIncomingCallPopup] = useState(false);
  const { callStatus, incomingCallData, showIncomingDialog, localStream } = useSelector((state) => state.call);

  useEffect(() => {
    dispatch(initializeApp());

    const initializeAppData = async () => {
      try {
        const data = await fetchHomeData();
        dispatch(setUserInfo(data.userInfo));
        setInitialDataLoaded(true);

        if ((token && !anonymousId) || (!token && anonymousId)) {
            connectWithSocketServer({ token, anonymousId }, dispatch);
        }
      } catch (err) {
        setError("Failed to load initial data");
        setInitialDataLoaded(true);
        localStorage.clear();
      }
    };

    initializeAppData();
  }, [dispatch, token, anonymousId]);

  useEffect(() => {
  
    if (callStatus != "accepted" && localStream) {
      localStream.getTracks().forEach((track) => track.stop());

      dispatch(setLocalStream(null));

    }
  },[callStatus])
  const handleCloseIncomingCall = () => {
    dispatch(clearIncomingCall());
  };

  if (!initialDataLoaded) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RoleRouter />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

       <IncomingCallDialog
        open={showIncomingDialog}
        onClose={handleCloseIncomingCall}
        callerName={incomingCallData?.userName}
      />
{callStatus == "accepted" && <CallWindow callType="video" />}

    </>
  );
}

export default App;
