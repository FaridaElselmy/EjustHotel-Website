// routes/resetPassword.js
const express = require("express");
const router = express.Router();
const { requestPasswordReset, resetPassword } = require("../controllers/resetpass");

router.post("/reset-password-request", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;
