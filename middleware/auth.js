const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access Denied!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid Token!" });
  }
};

module.exports = authenticate;
