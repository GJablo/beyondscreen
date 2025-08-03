// Post controller
const Post = require("../models/Post");

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content, imageUrl } = req.body;

    const post = new Post({
      user: req.user._id,
      content,
      imageUrl,
    });

    const saved = await post.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts (community feed)
// @route   GET /api/posts
// @access  Public or Private
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like / Unlike a post
// @route   PATCH /api/posts/:id/like
// @access  Private
exports.toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
      return res.status(200).json({ message: "Post unliked", likes: post.likes });
    } else {
      // Like
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked", likes: post.likes });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
// @access  Private
exports.commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();
    res.status(200).json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
