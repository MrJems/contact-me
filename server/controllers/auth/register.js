const User = require("../../models/user");

const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already taken",
      });
    }

    const newUser = await User.create({ username, email, password });

    return res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = registerController;
