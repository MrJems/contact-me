const jwt = require("jsonwebtoken");
const config = require("../config/constants");

const verifySocketUser = (socket, next) => {
  const userData = socket.handshake.auth;
  console.log(userData);
  next();
};
module.exports = verifySocketUser;
