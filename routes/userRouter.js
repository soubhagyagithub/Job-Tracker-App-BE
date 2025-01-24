const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/auth");

// Authentication routes
router.post("/signup", userController.postUserSignUp);
router.post("/login", userController.postUserLogin);

// Route to update user profile (personal info and career goals)
router.put("/profile", userController.updateUserProfile);

// Route to get user profile information (with new fields)
router.get("/profile", userController.getUserProfile);

module.exports = router;
