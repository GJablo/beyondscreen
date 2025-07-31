













const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

const goalRoutes = require("./routes/goalRoutes");
app.use("/api/goals", goalRoutes);
