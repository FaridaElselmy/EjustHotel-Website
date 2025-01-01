// src/pages/PasswordResetRequest.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/reset-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Check your email for the password reset link.");
      } else {
        setMessage(data.message || "Error occurred");
      }
    } catch (error) {
      setMessage("Error occurred while requesting reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Request Password Reset</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      {message && <Typography sx={{ marginTop: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default PasswordResetRequest;
