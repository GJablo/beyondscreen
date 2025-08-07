const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity, getMyActivities, joinActivity, getJoinedActivities } = require('../controllers/activityController'); // Importing the functions from the controller

const { protect } = require('../middleware/auth'); // middleware to protect routes

// Public routes
router.get('/', getAllActivities);
router.get('/:id', getActivityById);

// Protected routes
router.post('/', protect, createActivity);
router.put('/:id', protect, updateActivity);
router.delete('/:id', protect, deleteActivity);

// New routes
router.get('/me/activities', protect, getMyActivities);
router.post('/:id/join', protect, joinActivity);
router.get('/me/joined', protect, getJoinedActivities);

// Exporting the router
module.exports = router;
