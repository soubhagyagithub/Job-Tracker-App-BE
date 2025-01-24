const SibApiV3Sdk = require("sib-api-v3-sdk");

const apiClient = SibApiV3Sdk.ApiClient.instance;
const apiKeyInstance = apiClient.authentications["api-key"];
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
apiKeyInstance.apiKey = "your-sendinblue-api-key"; // Replace with your Sendinblue API key
const transactionApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Function to send reminder email
async function sendReminderEmail(toEmail, reminderMessage) {
  const email = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: toEmail }],
    sender: { email: "your-email@example.com" }, // Replace with your email
    subject: "Reminder: Follow-up Task",
    htmlContent: `<html><body><h2>Reminder</h2><p>${reminderMessage}</p></body></html>`,
  });

  try {
    const result = await transactionApi.sendTransacEmail(email);
    console.log("Reminder email sent:", result);
  } catch (err) {
    console.error("Error sending reminder email:", err);
  }
}

module.exports = { sendReminderEmail };
