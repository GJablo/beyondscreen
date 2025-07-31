const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity } = require('../controllers/activityController'); // Importing the functions from the controller

const { protect } = require('../middleware/auth'); // middleware to protect routes

// Public routes
router.get('/', getAllActivities);
router.get('/:id', getActivityById);

// Protected routes
router.post('/', protect, createActivity);
router.put('/:id', protect, updateActivity);
router.delete('/:id', protect, deleteActivity);

// Exporting the router
module.exports = router;
