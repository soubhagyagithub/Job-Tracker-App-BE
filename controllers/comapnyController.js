const Company = require("../models/companyModel");

// Create a new company profile
exports.createCompany = async (req, res) => {
  try {
    const { name, contactDetails, companySize, industry, notes } = req.body;

    const company = await Company.create({
      name,
      contactDetails,
      companySize,
      industry,
      notes,
    });

    res.status(201).json({
      message: "Company profile created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating company profile", error });
  }
};

// Get all company profiles
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company profiles", error });
  }
};

// Get a single company profile by ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company profile", error });
  }
};

// Update a company profile
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    Object.assign(company, req.body);
    await company.save();

    res.status(200).json({
      message: "Company profile updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating company profile", error });
  }
};

// Delete a company profile
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.destroy();
    res.status(200).json({ message: "Company profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company profile", error });
  }
};
