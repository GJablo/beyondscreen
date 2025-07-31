const Goal = require("../models/Goal");
const { calculateStreak } = require("../utils/streakCalculator");

// @desc    Add progress to a goal and recalculate streak
// @route   POST /api/goals/:goalId/progress
// @access  Private
exports.addProgressToGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { date, value } = req.body;

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.progressLog.push({ date, value });

    // Recalculate streak before saving
    goal.streakCount = calculateStreak(goal.progressLog);

    await goal.save();
    res.status(200).json({ message: "Progress updated", goal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = async (req, res) => {
  try {
    const { title, type, targetValue, unit } = req.body;

    const goal = new Goal({
      user: req.user._id, // Assumes user is set in auth middleware
      title,
      type,
      targetValue,
      unit,
      progressLog: [],
      streakCount: 0,
    });

    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all goals for a user
// @route   GET /api/goals
// @access  Private
exports.getUserGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:goalId
// @access  Private
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await goal.deleteOne();
    res.status(200).json({ message: "Goal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
