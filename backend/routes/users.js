// const express = require('express');
// const router = express.Router();
// const User = require('../models/Users');

// // User registration
// router.post('/register', async (req, res) => {
//     const { Name, email, password, studentId } = req.body;
//     console.log("Request Body:", req.body);
  
//     try {
//       // Check if the user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }
  
//       // Create a new user
//       const newUser = new User({ Name, email, password, studentId });
//       await newUser.save();
  
//       res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to register user', error });
//     }
//   });
  

// // User login (without JWT)
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Check if the user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ message: 'User not found' });
//       }
  
//       // Compare the entered password with the stored hashed password
//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }
  
//       req.session.userId = user._id;  // Store user ID in session
  
//       console.log('User logged in with session ID:', req.sessionID); 
  
//       res.status(200).json({
//         message: 'Login successful',
//         userId: user._id,  // Return userId
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Failed to log in', error: error.message });
//     }
//   });
// router.post('/logout', (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to log out' });
//       }
//       res.status(200).json({ message: 'Logged out successfully' });
//     });
//   });

// router.get('/register/:userId', async (req, res) => {
//     try {
//         // Retrieve user data by userId
//         const user = await User.findById(req.params.userId);
        
//         // Check if user exists
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Send the user profile information
//         res.status(200).json({
//             Name: user.Name,
//             email: user.email,
//             studentId: user.studentId,
//             userId: user._id
//         });
//     } catch (error) {
//         console.error('Error retrieving user profile:', error);
//         res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
//     }
// });


// // GET Login status (check if the user is logged in)
// router.get('/login', (req, res) => {
//     if (req.session.userId) {
//         return res.status(200).json({ message: 'User is logged in', userId: req.session.userId });
//     } else {
//         return res.status(200).json({ message: 'User is not logged in' });
//     }
// });
// router.post('/logout', (req, res) => {
//   // Destroy the session
//   req.session.destroy((err) => {
//       if (err) {
//           return res.status(500).json({ message: 'Failed to log out' });
//       }
//       res.status(200).json({ message: 'Logged out successfully' });
//   });
// });
// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// User Service to handle user-related operations
class UserService {
    static async registerUser(data) {
        const { Name, email, password, studentId } = data;
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Create and save the user
        const newUser = new User({ Name, email, password, studentId });
        await newUser.save();
        return newUser;
    }

    static async loginUser(email, password) {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return user;
    }

    static async getUserProfile(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

// Routes
// User registration

router.post('/register', async (req, res) => {
    const { Name, email, password, studentId } = req.body;
    console.log("Request Body:", req.body);
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ Name, email, password, studentId });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user', error });
    }
  });
  

// User login (without JWT)
router.post('/login', async (req, res) => {
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
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });

router.get('/register/:userId', async (req, res) => {
    try {
        // Retrieve user data by userId
        const user = await User.findById(req.params.userId);
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user profile information
        res.status(200).json({
            Name: user.Name,
            email: user.email,
            studentId: user.studentId,
            userId: user._id
        });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Failed to retrieve user profile', error: error.message });
    }
});


// GET Login status (check if the user is logged in)
router.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.status(200).json({ message: 'User is logged in', userId: req.session.userId });
    } else {
        return res.status(200).json({ message: 'User is not logged in' });
    }
});
router.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).json({ message: 'Failed to log out' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
