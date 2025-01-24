const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Routes for company management
router.post("/createCompany", companyController.createCompany); // Create a company
router.get("/getCompany", companyController.getAllCompanies); // Get all companies
router.put("/updateCompany/:id", companyController.updateCompany); // Update a specific company
router.delete("/deleteCompany/:id", companyController.deleteCompany); // Delete a specific company

module.exports = router;
