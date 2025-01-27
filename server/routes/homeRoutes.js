const express = require("express");
const homeController = require("../controllers/home/homeController");

const router = express.Router();

router.get("/", homeController);

// router.get("/user/:id");

module.exports = router;
