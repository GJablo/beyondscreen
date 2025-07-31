// Activity model
const mongoose =  require('mongoose');

// Define the activity schema
const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide an activity name'],
    trim: true,
    maxlength: [50, 'Activity name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['outdoor', 'indoor', 'sports', 'cultural', 'educational', 'community', 'entertainment', 'other'],
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Please provide a duration'],
    min: [10, 'Duration must be at least 10 minutes'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please provide a difficulty level'],
    enum: ['easy', 'medium', 'hard'],
  },
  location: {
    type: String, // Location can be a string for simplicity || Optional
  }
});

// Export the activity model
module.exports = mongoose.model('Activity', activitySchema);
