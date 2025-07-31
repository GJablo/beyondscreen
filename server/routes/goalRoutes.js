const express = require('express');
const router = express.Router();
const {
  createGoal,
  getUserGoals,
  addProgressToGoal,
  deleteGoal
} = require('../controllers/goalController');
const { protect } = require('../middleware/auth'); // Ensure middleware path is correct

// All routes below are protected
router.use(protect);

// @route   POST /api/goals
// @desc    Create a new goal
router.post('/', createGoal);

// @route   GET /api/goals
// @desc    Get all goals for logged-in user
router.get('/', getUserGoals);

// @route   POST /api/goals/:goalId/progress
// @desc    Add progress to a specific goal and update streak
router.post('/:goalId/progress', addProgressToGoal);

// @route   DELETE /api/goals/:goalId
// @desc    Delete a goal
router.delete('/:goalId', deleteGoal);

module.exports = router;
