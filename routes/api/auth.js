import express from "express";
import { check } from "express-validator";
import { authMiddleware } from "../../middleware/auth";
import { authController } from "../../controllers";

const router = express.Router();

// @route   GET api/auth
// @desc    Get User route
// @access  Private
router.get("/", authMiddleware, authController.getUser);

// @route   POST api/auth
// @desc    Authenticate User and get Token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required!").exists(),
  ],
  authController.authenticateUser
);

export default router;
