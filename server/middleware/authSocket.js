const jwt = require("jsonwebtoken");
const config = require("../config/constants");
const User = require("../models/user");

const verifySocketUser = async (socket, next) => {
  try {
    const { token, anonymousId } = socket.handshake.auth.userData || {};

    console.log("-------runnning middleware-------", socket.handshake.auth);
    if (!token && !anonymousId) {
      return next(
        new Error("No token or anonymousId provided, authorization denied.")
      );
    }

    if (token) {
      const decoded = jwt.verify(token, config.JWT_SECRET);

      if (!decoded) {
        return next(new Error("Invalid token."));
      }

      const user = await User.findById(decoded.userId);
      if (!user) {
        return next(new Error("User not found, authorization denied."));
      }

      socket.data.user = {
        userOID: user._id,
        userName: user.username,
        role: user.role,
      };
      console.log("...........all good user ", socket.data.user);
      return next(); // All good, proceed
    }

    // ====================================
    //   2) If anonymousId is present
    // ====================================
    if (anonymousId) {
      // Attempt to find an existing user with that username
      const anonymousUser = await User.findOne({ username: anonymousId });
      if (!anonymousUser) {
        // We do NOT create a new user if it doesn't exist.
        // We simply fail the connection if not found.
        return next(
          new Error("Anonymous user not found, authorization denied.")
        );
      }

      socket.data.user = {
        userOID: anonymousUser._id,
        userName: anonymousUser.username,
        role: anonymousUser.role,
      };

      // socket.data.user = anonymousUser;
      return next();
    }
  } catch (error) {
    console.error("Socket Auth Error:", error.message);
    next(new Error("Authentication failed"));
  }
};

module.exports = verifySocketUser;
