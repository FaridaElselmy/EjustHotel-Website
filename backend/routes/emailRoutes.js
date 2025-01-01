const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config(); // Load environment variables from .env file
const crypto = require("crypto");
const User = require("../models/Users");

router.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;
  
    // Validate required fields
    if (!to || !subject || !message) {
      return res.status(400).send("Missing required fields (to, subject, message)");
    }
  
    // Validate email format (optional but recommended)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).send("Invalid email format");
    }
  
    try {
      // Configure the transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // You can change this if you use another service
        auth: {
          user: process.env.EMAIL_USER, // Gmail address from environment variables
          pass: process.env.EMAIL_PASS, // App password from environment variables
        },
      });
  
      // Send the email
      await transporter.sendMail({
        from: `"Booking Confirmation" <${process.env.EMAIL_USER}>`, // Sender address
        to: to, // Correct field for recipient address
        subject: subject, // Subject line
        html: message, // HTML body
      });
  
      // Respond with success
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error.message);
      res.status(500).send("Failed to send email");
    }
  });
  

module.exports = router;
