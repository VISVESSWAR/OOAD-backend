const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token after "Bearer"
  console.log("token is " + token);
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    console.log("authorized");
    next();
  });
};

exports.verifyRole = (requiredRole) => (req, res, next) => {
  if (req.user.role !== requiredRole) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};
