import io from "socket.io-client";

let socket = null;

export const connectWithSocketServer = (userData) => {
  socket = io("http://localhost:3000", {
    auth: {
      userData,
    },
  });

  socket.on("connect", () => {
    console.log("connected ", socket.id);
    console.log("connected data", userData);
  });
};
