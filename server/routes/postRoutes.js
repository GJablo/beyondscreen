const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, toggleLikePost, commentOnPost, deletePost } = require("../controllers/postController");

const { protect } = require("../middleware/auth");
const authMiddleware = protect;

// Routes
router.post("/", authMiddleware, createPost); // authorized users can create posts
router.get("/", getAllPosts); // anyone can get all posts
router.patch("/:id/like", authMiddleware, toggleLikePost); // authorized users can like / unlike posts
router.post("/:id/comment", authMiddleware, commentOnPost); // authorized users can comment on posts
router.delete("/:id", authMiddleware, deletePost); // authorized users can delete their own posts

// Export the router
module.exports = router;
