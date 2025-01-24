const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodeCron = require("node-cron");
const sequelize = require("./util/database");
const reminderController = require("./controllers/reminderController"); // For cron logic

dotenv.config();

// Routers
const userRouter = require("./routes/userRouter");
const reminderRouter = require("./routes/reminderRouter");
const companyRouter = require("./routes/companyRouter");
const jobListingRouter = require("./routes/jobListingRouter");
const jobApplicationRouter = require("./routes/jobApplicationRouter");

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/user", userRouter); // User routes
app.use("/job", reminderRouter); // Reminder routes
app.use("/company", companyRouter); // Reminder routes
app.use("/job-listings", jobListingRouter);
app.use("/job-applications", jobApplicationRouter);

// Schedule cron job to send reminders every minute
nodeCron.schedule("* * * * *", async () => {
  console.log("Running cron job to send pending reminders...");
  try {
    await reminderController.sendPendingReminders();
    console.log("Cron job executed successfully.");
  } catch (error) {
    console.error("Error running cron job:", error.message);
  }
});

// Database sync and server startup
const PORT = process.env.PORT || 4000;
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
