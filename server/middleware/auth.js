const jwt = require("jsonwebtoken");
const config = require("../config/constants");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const anonymousId = req.headers["anonymous-id"];

    // Handle Anonymous User
    if (anonymousId) {
      let anonymousUser = await User.findOne({ username: anonymousId });

      if (!anonymousUser) {
        // Create a new anonymous user if not found
        anonymousUser = await User.create({
          username: anonymousId,
          role: "anonymous",
        });
      }

      req.user = anonymousUser;
      return next(); // Proceed to the next middleware
    }

    // Handle Authenticated User
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Fetch user details from the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    req.user = user; // Attach the user to the request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authenticateUser;
