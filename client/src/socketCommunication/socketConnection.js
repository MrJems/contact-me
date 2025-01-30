import io from "socket.io-client";
import { setOnlineUsers } from "../features/admindata/adminSlice";
import { data } from "react-router-dom";

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
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};
