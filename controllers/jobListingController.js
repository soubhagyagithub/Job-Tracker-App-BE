const JobListing = require("../models/jobListingModel");
const Company = require("../models/companyModel");

// Create a new job listing
exports.createJobListing = async (req, res) => {
  try {
    const { title, description, link, companyId } = req.body;

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const jobListing = await JobListing.create({
      title,
      description,
      link,
      companyId,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Job listing saved successfully",
      jobListing,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating job listing", error });
  }
};

// Get all job listings for a user
exports.getAllJobListings = async (req, res) => {
  try {
    const jobListings = await JobListing.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(jobListings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job listings", error });
  }
};

// Get a single job listing by ID
exports.getJobListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const jobListing = await JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    res.status(200).json(jobListing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job listing", error });
  }
};

// Delete a job listing
exports.deleteJobListing = async (req, res) => {
  try {
    const { id } = req.params;

    const jobListing = await JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    await jobListing.destroy();
    res.status(200).json({ message: "Job listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job listing", error });
  }
};
