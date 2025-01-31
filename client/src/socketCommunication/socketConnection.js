import io from "socket.io-client";
import { setOnlineUsers } from "../features/admindata/adminSlice";
import { setMessages } from "../features/chat/chatSlice";

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
  });

  socket.on("online-users", (data) => {
    console.log("online users ", data);
    dispatch(setOnlineUsers(data));
  });

  socket.on("chat-history", (data) => {
    dispatch(setMessages(data.messages));
    console.log("the chat history data : ", data);
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
  if (!socket) {
    console.error("Socket is not connected. Cannot send message.");
    return;
  }
  console.log(">........");
  socket.emit("chat-history", data);
};
