const express = require('express');
const router = express.Router();
const { createGoal, getUserGoals, addProgressToGoal, deleteGoal } = require('../controllers/goalController');

// Import the auth middleware
const { protect } = require('../middleware/auth');

// All routes below are protected
router.use(protect);

// @desc    Create a new goal
router.post('/', createGoal);

// @desc    Get all goals for logged-in user
router.get('/', getUserGoals);

// @desc    Add progress to a specific goal and update streak
router.post('/:goalId/progress', addProgressToGoal);

// @desc    Delete a goal
router.delete('/:goalId', deleteGoal);

// Export the router
module.exports = router;
