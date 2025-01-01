// // controllers/authController.js
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// // Sign In (Login) Handler
// exports.signIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     // If password matches, send a success response (e.g., JWT token)
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Error during sign-in:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
