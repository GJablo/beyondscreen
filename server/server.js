require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();
connectDB();

// Middlewares
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));
// Increase payload limit and disable body parsing for multipart
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));


// Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/postRoutes");
const goalRoutes = require("./routes/goalRoutes");
const activityRoutes = require('./routes/activityRoutes');

// Route middleware
app.use('/api/users', userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/goals", goalRoutes);
app.use('/api/activities', activityRoutes);

// Configure port and running link
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
