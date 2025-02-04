const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const config = require("../../config/constants");

const homeController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const anonymousId = req.headers["anonymous-id"];

    if (anonymousId) {
      const existingAnonymousUser = await User.findOne({
        username: anonymousId,
      });

      if (existingAnonymousUser) {
        return res.status(200).json({
          message: "Welcome Back",
          userInfo: {
            userID: existingAnonymousUser._id,
            username: existingAnonymousUser.username,
            role: existingAnonymousUser.role,
          },
        });
      } else {
        const newAnonymousUser = await User.create({ username: anonymousId });

        return res.status(200).json({
          message: "Welcome Back",
          userInfo: {
            userID: newAnonymousUser._id,
            username: newAnonymousUser.username,
            role: newAnonymousUser.role,
          },
        });
      }
    }

    if (!authHeader) {
      return res.status(401).json({ message: "Invalid Username or password" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;
    const user = await User.findById(req.user.userId);
    console.log("this is user", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid Username or password" });
    }

    if (user.role === "user") {
      return res.status(200).json({
        message: "welcome user",
        userInfo: {
          userID: user._id,
          username: user.username,
          role: user.role,
        },
      });
    }

    if (user.role === "admin") {
      return res.status(200).json({
        message: "welcome admin",
        userInfo: {
          userID: user._id,
          username: user.username,
          role: user.role,
        },
      });
    }

    return res.status(401).json({
      message: "something went wrong while authorizing",
    });
  } catch (error) {
    console.error(" Error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = homeController;
