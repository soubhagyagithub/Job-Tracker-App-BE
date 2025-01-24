const Reminder = require("../models/Reminder");
const { sendReminderEmail } = require("../services/emailService");

// Create a new reminder
exports.createReminder = async (req, res) => {
  try {
    const { userId, jobApplicationId, message, reminderDate } = req.body;

    const reminder = await Reminder.create({
      userId,
      jobApplicationId,
      message,
      reminderDate,
    });

    res.status(201).json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get reminders for a specific user
exports.getUserReminders = async (req, res) => {
  try {
    const { userId } = req.params;

    const reminders = await Reminder.findAll({ where: { userId } });
    res.status(200).json({ success: true, reminders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a reminder (e.g., mark it as sent)
exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findByPk(id);
    if (!reminder) {
      return res
        .status(404)
        .json({ success: false, message: "Reminder not found" });
    }

    Object.assign(reminder, req.body);
    await reminder.save();

    res.status(200).json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Send reminders (used by the cron job or triggered manually)
exports.sendPendingReminders = async () => {
  try {
    const now = new Date();

    const reminders = await Reminder.findAll({
      where: { isSent: false, reminderDate: { [Sequelize.Op.lte]: now } },
    });

    for (const reminder of reminders) {
      // Send email notification
      await sendReminderEmail(
        "user-email@example.com", // Replace this with the user's actual email
        "Follow-Up Reminder",
        `Reminder: ${reminder.message}`
      );

      // Mark reminder as sent
      reminder.isSent = true;
      await reminder.save();
    }

    console.log(`Processed ${reminders.length} reminders`);
  } catch (error) {
    console.error("Error processing reminders:", error);
  }
};
