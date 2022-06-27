import express from "express";
import { authMiddleware } from "../../middleware/auth";
import User from "../../models/User";

const router = express.Router();

// @route   GET api/auth
// @desc    Get User route
// @access  Public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
