import io from "socket.io-client";
import { setOnlineUsers } from "../features/admindata/adminSlice";
import { setMessages } from "../features/chat/chatSlice";
import { setSocketConnected } from "../features/user/userSlice";
import { setIncomingCall, clearIncomingCall } from "../features/call/callSlice";

let socket = null;

export const connectWithSocketServer = (userData, dispatch) => {
  socket = io("http://localhost:3000", {
    auth: {
      userData,
    },
  });

  socket.on("connect", () => {
    console.log("connected ", socket.id);
    console.log("connected data", userData);
    dispatch(setSocketConnected(true));
  });

  socket.on("online-users", (data) => {
    console.log("online users ", data);
    dispatch(setOnlineUsers(data));
  });

  socket.on("chat-history", (data) => {
    dispatch(setMessages(data.messages));
    console.log("the chat history data : ", data);
  });

  socket.on("incoming-call", (data) => {
    console.log("incoming call data : ", data);
    dispatch(setIncomingCall(data));
  });

  socket.on("answer-call", (callData) => {
    // Mark the call as answered in your system
    // Possibly notify the other side:
    // io.to(theCallerSocket).emit("call-answered", { ... });
  });

  socket.on("reject-call", (callData) => {
    // Mark the call as rejected
    // Possibly emit "call-ended" to the caller
  });

  socket.on("call-ended", () => {
    console.log("Call ended by the other side or server");
    dispatch(clearIncomingCall());
  });
};

export const sendDirectMessage = (data) => {
  if (!socket) {
    console.error("Socket is not connected. Cannot send message.");
    return;
  }

  console.log("Sending direct message:", data);
  socket.emit("send-message", data);
};

export const getChatHistory = (data) => {
  console.log("chhahhdhaht data ", data);
  if (!socket) {
    console.error("Socket is not connected. Cannot send message.");
    return;
  }
  console.log(">........");
  socket.emit("chat-history", data);
};

export const initiateCall = (data) => {
  if (!socket) {
    console.error("Socket is not connected. Cannot start call.");
    return;
  }
  socket.emit("initiate-call", data);
};

export const answerCall = (callData) => {
  if (!socket) return console.error("Socket is not connected");
  socket.emit("answer-call", callData);
  console.log("Answered call with data:", callData);
};

export const rejectCall = (callData) => {
  if (!socket) return console.error("Socket is not connected");
  socket.emit("reject-call", callData);
  console.log("Rejected call with data:", callData);
};

export const endCall = (data) => {
  if (!socket) return console.error("Socket is not connected");
  socket.emit("end-call", data);
  console.log("Ended call");
};

export const disconnectSocketServer = () => {
  if (socket) {
    socket.disconnect();
    console.warn("Socket disconnected");
    // console.log("Socket disconnected");
    socket = null;
  }
};
