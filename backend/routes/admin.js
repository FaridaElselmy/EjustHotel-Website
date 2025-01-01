
const express = require('express');
const AdminService = require('../routes/Service/AdminService'); // Import the service
const router = express.Router();
const Booking = require('../models/Booking'); // Import Booking model
const User = require('../models/Users'); // Import User model

// Route to get all bookings with user details
router.get('/admin/bookings', async (req, res) => {
  try {
    // Fetch all bookings and populate userId with user details
    const bookings = await Booking.find()
      .populate('user', 'name email') // Populate with user details
      .setOptions({ strictPopulate: false }) // Optionally disable strict populate
      .exec();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found.' });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
});
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user._id;  // Store user ID in session

    console.log('User logged in with session ID:', req.sessionID); 

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,  // Return userId
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to log in', error: error.message });
  }
});
router.delete('/admin/bookings/:bookingId', async (req, res) => {
  const { bookingId } = req.params;  // Corrected line
  if (!bookingId || bookingId === "undefined") {
      return res.status(400).json({ message: "Invalid booking ID" });
  }
  try {
      const result = await Booking.findByIdAndDelete(bookingId);
      if (!result) {
          return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
  }
});

module.exports = router;
