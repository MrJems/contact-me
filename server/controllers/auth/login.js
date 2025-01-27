const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const config = require("../../config/constants");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      userId: user._id,
      roles: user.roles,
    };

    if (!config.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in .env file.");
    }

    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = login;
