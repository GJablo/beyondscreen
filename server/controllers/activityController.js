// Activity Controller
const Activity = require('../models/Activity');

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      user: req.user.id // associate activity with current user
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create activity', error: error.message });
  }
};

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate('user', 'username email');
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
};

// @desc    Get a single activity by ID
// @route   GET /api/activities/:id
// @access  Public
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('user', 'username email');

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
};

// @desc    Update activity
// @route   PUT /api/activities/:id
// @access  Private (Only creator)
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this activity' });
    }

    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update activity' });
  }
};

// @desc    Delete activity
// @route   DELETE /api/activities/:id
// @access  Private (Only creator)
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this activity' });
    }

    await activity.remove();
    res.status(200).json({ message: 'Activity deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete activity' });
  }
};
