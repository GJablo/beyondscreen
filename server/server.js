require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

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
