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


// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [authMiddleware, [check("text", "Text is required!").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment
// @access  Private
router.delete("/comment/:id/:comment_id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists!" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized!" });
    }
    // Get the remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
