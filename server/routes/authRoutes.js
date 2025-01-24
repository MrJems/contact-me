const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator();
const Joi = require("joi");

const authControllers = require("../controllers/auth/authControllers");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().max(320).required(),
  password: Joi.string().min(8).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(320).required(),
  password: Joi.string().min(8).max(30).required(),
});

router.post("/login", validator.body(loginSchema), authControllers.login);
router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.register
);
module.exports = router;
