const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");

// Endpoint to create a job application
router.post("/addJob", jobApplicationController.createJobApplication);
// Route to get job application progress and statistics
router.get("/progress", jobApplicationController.getJobApplicationStats);
router.get("/search", jobApplicationController.searchAndFilterJobApplications);

// Route to update job application notes
router.put("/:id/notes", jobApplicationController.updateJobApplicationNotes);

// Route to get job application details (including notes)
router.get("/:id", jobApplicationController.getJobApplicationById);
module.exports = router;
