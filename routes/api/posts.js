import express from "express";
import { check } from "express-validator";
import { authMiddleware } from "../../middleware/auth";
import { postController } from "../../controllers";

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [authMiddleware, [check("text", "Text is required!").not().isEmpty()]],
  postController.createPost
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", authMiddleware, postController.getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", authMiddleware, postController.getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", authMiddleware, postController.deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", authMiddleware, postController.likePost);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", authMiddleware, postController.unlikePost);

export default router;
