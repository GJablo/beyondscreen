// Goal model
const mongoose = require("mongoose");

// Define the goal schema
const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["screen-time", "activity", "nature", "custom"],
    default: "custom",
  },
  targetValue: {
    type: Number, // e.g. 1 hour per day = 1
    required: true,
  },
  unit: {
    type: String,
    enum: ["hours", "minutes", "days"],
    default: "hours",
  },
  streakCount: {
    type: Number,
    default: 0,
  },
  progressLog: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      value: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the goal model
module.exports = mongoose.model("Goal", goalSchema);
