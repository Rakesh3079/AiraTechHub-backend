const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Customize email body to include sender's email and message
    const emailBody = `
      You received a new message from the contact form on AiraTechHub.

      Name: ${name}
      Email: ${email}
      Message:
      ${message}
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER, // you can keep it from your email
      to: process.env.GMAIL_USER,   // your email to receive
      subject: `New Contact Form Submission from ${name}`,
      text: emailBody,
    });

    res.status(200).send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
