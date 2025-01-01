// const express = require("express");
// const Service = require("../models/Service");
// const router = express.Router();

// // Create a new service
// router.post("/services", async (req, res) => {
//     const { userId, bookingId, food, court, gym, name, price } = req.body;

//     try {
//         if (!userId || !bookingId) {
//             return res.status(400).json({ error: "User ID and Booking ID are required" });
//         }

//         const newService = new Service({
//             userId:userId,
//             bookingId:bookingId,
//             food:food,
//             court:court,
//             gym:gym,

//             price:price,
//         });
//         const savedService = await newService.save();
//         res.status(201).json({ message: "Service created successfully", savedService });
//     } catch (error) {
//         console.error("Error creating service:", error);
//         res.status(500).json({ message: "Error creating service", error });
//     }
// });

// // Get services by bookingId
// router.get("/services/:bookingId", async (req, res) => {

//     try {
//         const services = await Service.find({ bookingId: req.params.bookingId  });
//         console.log("GET THE SERVICE TEST : ", services);
//         res.status(200).json({ services });
//     } catch (error) {
//         console.error("Error fetching services:", error);
//         res.status(500).json({ error: "Error fetching services" });
//     }
// });

// module.exports = router;
const express = require("express");
const ServiceService = require('../routes/Service/ServiceService'); // Import the service
// Assuming you have a Service model file in models directory
const Service = require('../models/Service');  // Make sure this path is correct

const router = express.Router();

// Create a new service
router.post("/services", async (req, res) => {
    const { userId, bookingId, food, court, gym, name, price } = req.body;

    try {
        if (!userId || !bookingId) {
            return res.status(400).json({ error: "User ID and Booking ID are required" });
        }

        const newService = new Service({
            userId:userId,
            bookingId:bookingId,
            food:food,
            court:court,
            gym:gym,

            price:price,
        });
        const savedService = await newService.save();
        res.status(201).json({ message: "Service created successfully", savedService });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Error creating service", error });
    }
});

// Get services by bookingId
router.get("/services/:bookingId", async (req, res) => {

    try {
        const services = await Service.find({ bookingId: req.params.bookingId  });
        console.log("GET THE SERVICE TEST : ", services);
        res.status(200).json({ services });
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ error: "Error fetching services" });
    }
});

module.exports = router;
