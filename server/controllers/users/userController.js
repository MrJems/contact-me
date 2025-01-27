const User = require("../../models/user");

const userController = async (req, res) => {
  try {
    if (req.user.role === "admin" && req.params.id) {
      const user = await User.findOne({ username: req.params.id });
      return res.status(200).json({
        message: "users",
        admin: true,
        user,
      });
    } else {
      return res.status(401).json({ message: "Authorization denied" });
    }
  } catch (error) {
    console.error(" Error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = userController;
