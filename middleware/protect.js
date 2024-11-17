import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes and verify JWT
const protect = async (req, res, next) => {
  let token;
  if (req.header("Authorization") && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.header("Authorization").split(" ")[1]; // Get token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

      // Attach user info to request object
      req.user = await User.findById(decoded.id).select("-password");
      next(); // Proceed to next middleware or controller
    } catch (error) {
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};

// Middleware for checking roles (e.g. admin)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};

export { protect, authorize };
