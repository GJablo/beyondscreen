const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updatePassword } = require('../controllers/userController');

const { protect } = require('../middleware/auth'); // middleware to check if user is logged in

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

module.exports = router;
