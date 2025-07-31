// middleware for auth
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Return error if token not provided
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database without password field
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(403).json({ message: "Not authorized, token invalid" });
  }
};
