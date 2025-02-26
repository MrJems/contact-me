import io from "socket.io-client";
import { setOnlineUsers } from "../features/admindata/adminSlice";
import { setMessages } from "../features/chat/chatSlice";
import { setSocketConnected } from "../features/user/userSlice";
import {
  setIncomingCall,
  clearIncomingCall,
  setCallRejected,
  startOutgoingCall,
  endOutgoingCall,
  setCallAccepted,
} from "../features/call/callSlice";
import {
  getLocalStream,
  createPeerConnection,
  sendWebRTCOffer,
  handleWebRTCOffer,
  handleWebRTCAnswer,
  handleWebRTCCandidate,
} from "./webRTCHandler";

let socket = null;

export const connectWithSocketServer = (userData, dispatch) => {
  socket = io("http://localhost:3000", {
    auth: {
      userData,
    },
  });

  socket.on("connect", () => {
    dispatch(setSocketConnected(true));
  });

  socket.on("online-users", (data) => {
    dispatch(setOnlineUsers(data));
  });

  socket.on("chat-history", (data) => {
    console.log("chat history data : ", data);
    dispatch(setMessages(data));
  });

  socket.on("incoming-call", (data) => {
    dispatch(setIncomingCall(data));
  });

  socket.on("answer-call", async (callData) => {
    const onlyAudio = callData.type == "audio" ? true : false;
    await getLocalStream(dispatch, onlyAudio);
    createPeerConnection(dispatch, callData.userName);
    dispatch(setCallAccepted());
    sendWebRTCOffer(callData);
  });

  socket.on("reject-call", (callData) => {
    dispatch(setCallRejected());
  });

  socket.on("call-ended", () => {
    dispatch(clearIncomingCall());
  });

  socket.on("webRTC-signaling", (data) => {
    switch (data.type) {
      case "OFFER":
        handleWebRTCOffer(data);
        break;
      case "ANSWER":
        handleWebRTCAnswer(data);
        break;
      case "ICE_CANDIDATE":
        handleWebRTCCandidate(data);
        break;
      default:
        return;
    }
  });
};

export const sendDirectMessage = (data) => {
  if (!socket) {
    console.error("Socket is not connected. Cannot send message.");
    return;
  }

  socket.emit("send-message", data);
};

export const getChatHistory = (data) => {
  if (!socket) {
    console.error("Socket is not connected. Cannot send message.");
    return;
  }
  socket.emit("chat-history", data);
};

export const initiateCall = (data, dispatch) => {
  if (!socket) {
    console.error("Socket is not connected. Cannot start call.");
    return;
  }
  dispatch(startOutgoingCall(data));

  socket.emit("initiate-call", data);
};

export const answerCall = (callData) => {
  if (!socket) return console.error("Socket is not connected");
  socket.emit("answer-call", callData);
};

export const rejectCall = (callData) => {
  if (!socket) return console.error("Socket is not connected");
  socket.emit("reject-call", callData);
};

export const endCall = (data, dispatch) => {
  if (!socket) return console.error("Socket is not connected");

  dispatch(endOutgoingCall());
  socket.emit("end-call", data);
};

export const sendWebRTCSignalingData = (data) => {
  if (!socket) return console.error("Socket is not connected");
  socket.emit("webRTC-signaling", data);
};

export const disconnectSocketServer = () => {
  if (socket) {
    socket.disconnect();
    console.warn("Socket disconnected");
    socket = null;
  }
};
