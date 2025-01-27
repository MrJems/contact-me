const express = require("express");
const allUserController = require("../controllers/users/allUserController");
const userController = require("../controllers/users/userController");

const router = express.Router();

router.get("/", allUserController);
// router.get("/", auth, userController);
router.get("/:id", userController);

module.exports = router;
