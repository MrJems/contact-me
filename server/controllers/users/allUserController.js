const User = require("../../models/user");

const allUserController = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const users = await User.find(
        { _id: { $ne: req.user._id } },
        { username: 1, role: 1, _id: 0 }
      );

      return res.status(200).json({
        message: "all the users",
        admin: true,
        users,
      });
    } else {
      return res.status(401).json({ message: "Authorization denied" });
    }
  } catch (error) {
    console.error(" Error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = allUserController;
