// const express = require('express');
// const dotenv = require("dotenv");
// const connectDB = require("./db/connect");
// const bookingRoutes = require('./routes/booking');
// const usersRoute = require("./routes/users");
// const serviceRoute = require("./routes/services");
// const emailRoute = require("./routes/emailRoutes")
// const session = require('express-session');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const resetPasswordRoutes = require("./routes/resetpassword");
// const AdminRoutes = require("./routes/admin");

// // Load environment variables
// dotenv.config();

// // Initialize Express app
// const app = express();
// const port = process.env.PORT || 5000;
// app.use(bodyParser.json());

// // Use CORS middleware
// app.use(cors());

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Session configuration
// app.use(
//     session({
//         secret: 'your-secret-key', // Replace with a strong secret
//         resave: false, // Do not save session if unmodified
//         saveUninitialized: true, // Save uninitialized session
//         cookie: { secure: false }, // Set to `true` if using HTTPS
//     })
// );

// // Connect to MongoDB
// connectDB();

// // Use booking routes
// app.use("/api", bookingRoutes);
// app.use("/api", usersRoute);
// app.use("/api", serviceRoute);
// app.use("/api", emailRoute);
// app.use("/api", resetPasswordRoutes);
// app.use("/api", AdminRoutes);
// // Basic route for testing
// app.get('/', (req, res) => {
//     res.send("Hello, MongoDB is connected!");
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const bookingRoutes = require('./routes/booking');
const usersRoute = require("./routes/users");
const serviceRoute = require("./routes/services");
const emailRoute = require("./routes/emailRoutes")
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const AdminRoutes = require("./routes/admin");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Session configuration
app.use(
    session({
        secret: 'your-secret-key', 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, 
    })
);

// Connect to MongoDB
connectDB();

// Use routes
app.use("/api", bookingRoutes);
app.use("/api", usersRoute);
app.use("/api", serviceRoute);
app.use("/api", emailRoute);

app.use("/api", AdminRoutes);

app.get('/', (req, res) => {
    res.send("Hello, MongoDB is connected!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
