const jwt = require("jsonwebtoken");
const config = require("../../config/constants");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;
