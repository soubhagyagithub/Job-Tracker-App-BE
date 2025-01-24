const JobApplication = require("../models/jobApplicationModel");
const Company = require("../models/companyModel");
const upload = require("../middleware/fileUpload");

const createJobApplication = async (req, res) => {
  const { companyName, jobTitle, applicationDate, status, notes, companyId } =
    req.body;
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err });

    try {
      const company = await Company.findByPk(companyId);
      if (!company)
        return res.status(404).json({ message: "Company not found" });

      const newJobApplication = await JobApplication.create({
        companyName,
        jobTitle,
        applicationDate,
        status,
        notes,
        companyId,
        userId: req.user.id,
        documentPath: req.file ? req.file.path : null,
      });

      res.status(201).json({
        message: "Job application created successfully",
        jobApplication: newJobApplication,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating job application" });
    }
  });
};

const getJobApplicationStatus = async (req, res) => {
  try {
    // Total job applications
    const totalApplications = await JobApplication.count({
      where: { userId: req.user.id },
    });

    // Applications grouped by status
    const statusCounts = await JobApplication.findAll({
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("status")), "count"],
      ],
      where: { userId: req.user.id },
      group: ["status"],
    });

    // Response rate (applications with responseDate)
    const respondedApplications = await JobApplication.count({
      where: { userId: req.user.id, responseDate: { [Sequelize.Op.ne]: null } },
    });

    const responseRate =
      totalApplications === 0
        ? 0
        : (respondedApplications / totalApplications) * 100;

    // Average time to get a response (in days)
    const avgResponseTime = await JobApplication.findOne({
      attributes: [
        [
          sequelize.fn(
            "AVG",
            sequelize.literal("DATEDIFF(responseDate, applicationDate)")
          ),
          "avgResponseTime",
        ],
      ],
      where: { userId: req.user.id, responseDate: { [Sequelize.Op.ne]: null } },
    });

    res.status(200).json({
      totalApplications,
      statusCounts,
      responseRate,
      avgResponseTime: avgResponseTime
        ? avgResponseTime.get("avgResponseTime")
        : null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job application stats", error });
  }
};

// Search and filter job applications
const searchAndFilterJobApplications = async (req, res) => {
  const { search, status, startDate, endDate, companyId } = req.query;

  const query = {
    where: { userId: req.user.id },
  };

  // Search functionality (by job title or company name)
  if (search) {
    query.where[Op.or] = [
      { jobTitle: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search for jobTitle
      { companyName: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search for companyName
    ];
  }

  // Filter by job application status
  if (status) {
    query.where.status = status;
  }

  // Filter by application date range
  if (startDate && endDate) {
    query.where.applicationDate = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    query.where.applicationDate = {
      [Op.gte]: new Date(startDate),
    };
  } else if (endDate) {
    query.where.applicationDate = {
      [Op.lte]: new Date(endDate),
    };
  }

  // Filter by companyId
  if (companyId) {
    query.where.companyId = companyId;
  }

  try {
    const jobApplications = await JobApplication.findAll(query);
    res.status(200).json({ jobApplications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job applications", error });
  }
};
// Update job application notes
const updateJobApplicationNotes = async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  try {
    const jobApplication = await JobApplication.findByPk(id);
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    jobApplication.notes = notes; // Update notes
    await jobApplication.save();

    res.status(200).json({
      message: "Job application notes updated successfully",
      jobApplication,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating job application notes", error });
  }
};

// Get job application by ID (with notes)
const getJobApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const jobApplication = await JobApplication.findByPk(id);
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    res.status(200).json({ jobApplication });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job application", error });
  }
};
module.exports = {
  createJobApplication,
  getJobApplicationStatus,
  searchAndFilterJobApplications,
  updateJobApplicationNotes,
  getJobApplicationById,
};
