const express = require("express");
const router = express.Router();
const reminderController = require("../controllers/reminderController");

// Route to create a reminder
router.post("/reminder", reminderController.createReminder);

// Route to get reminders for a specific user
router.get("reminder/:userId", reminderController.getUserReminders);

// Route to update a specific reminder
router.put("reminder/:id", reminderController.updateReminder);

module.exports = router;
