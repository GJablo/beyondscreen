// Post model
const mongoose = require("mongoose");

// Define the post schema
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String, // store URL or file path
    default: "",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Add timestamps to comments in your Post model
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the post model
module.exports = mongoose.model("Post", postSchema);
