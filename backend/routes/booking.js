// const express = require('express');
// const Booking = require('../models/Booking');
// const router = express.Router();

// // Route to handle dates
// router.post('/booking/dates', async (req, res) => {
//     const { checkInDate, checkOutDate } = req.body;

//     if (!checkInDate || !checkOutDate) {
//         return res.status(400).json({ message: 'Check-in and check-out dates are required' });
//     }

//     try {
//         const checkIn = new Date(checkInDate);
//         const checkOut = new Date(checkOutDate);

//         if (checkIn >= checkOut) {
//             return res.status(400).json({ message: 'Check-out date must be after check-in date' });
//         }

//         // Temporarily save dates in a new booking entry
//         const newBooking = new Booking({
//             checkInDate: checkIn,
//             checkOutDate: checkOut,
//         });

//         await newBooking.save();

//         res.status(201).json({
//             message: 'Dates saved successfully',
//             bookingId: newBooking._id, // Return bookingId for future use
//         });
//     } catch (error) {
//         console.error('Error saving dates:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.get('/booking/:userId', async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.params.userId });
//     console.log('Bookings returned from backend:', bookings);
//     res.status(200).json({ bookings });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
//   }
// });





// router.post('/booking/details', async (req, res) => {
//     const { roomType, guests, checkInDate, checkOutDate, userId ,totalPrice} = req.body;

//     // Validate required fields
//     if (!roomType || !guests || !checkInDate || !checkOutDate || !userId) {
//         return res.status(400).json({ message: 'Room type, guests, check-in date, check-out date, and user ID are required' });
//     }

//     try {
//         // Create a new booking entry with the provided data
//         const booking = new Booking({
//             roomType: roomType,
//             guests: guests,
//             checkInDate: new Date(checkInDate),   // Convert string to Date object
//             checkOutDate: new Date(checkOutDate), // Convert string to Date object
//             user: userId,  // Save userId as reference to the User model
//             totalPrice:totalPrice,
//         });
//         console.log(totalPrice);

//         // Save the new booking to the database
//         await booking.save();
//         req.session.bookingId = booking._id;
//         res.status(201).json({
//             message: 'Booking details saved successfully',
//             bookingId: booking._id,  // Return bookingId for future use (optional)
//         });
//     } catch (error) {
//         console.error('Error saving booking details:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// router.delete("/bookings/:bookingId", async (req, res) => {
//     const bookingId = req.params.bookingId;

//     // Check if the bookingId is valid
//     if (!bookingId || bookingId === "undefined") {
//         return res.status(400).json({ message: "Invalid booking ID" });
//     }

//     try {
//         const deletedBooking = await Booking.findByIdAndDelete(bookingId);

//         if (!deletedBooking) {
//             return res.status(404).json({ message: "Booking not found" });
//         }

//         res.status(200).json({ message: "Booking canceled successfully" });
//     } catch (err) {
//         console.error("Error deleting booking:", err);
//         res.status(500).json({ message: "Error canceling booking" });
//     }
// });



// module.exports = router;
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// BookingService class to encapsulate business logic for bookings
class BookingService {
    static async saveDates(checkInDate, checkOutDate) {
        if (!checkInDate || !checkOutDate) {
            throw new Error('Check-in and check-out dates are required');
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkIn >= checkOut) {
            throw new Error('Check-out date must be after check-in date');
        }

        const newBooking = new Booking({
            checkInDate: checkIn,
            checkOutDate: checkOut,
        });

        return await newBooking.save();
    }

    static async getBookingsByUser(userId) {
        return await Booking.find({ user: userId });
    }

    static async saveBookingDetails({ roomType, guests, checkInDate, checkOutDate, userId, totalPrice }) {
        if (!roomType || !guests || !checkInDate || !checkOutDate || !userId) {
            throw new Error('Room type, guests, check-in date, check-out date, and user ID are required');
        }

        const booking = new Booking({
            roomType,
            guests,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            user: userId,
            totalPrice,
        });

        return await booking.save();
    }

    static async deleteBooking(bookingId) {
        if (!bookingId || bookingId === 'undefined') {
            throw new Error('Invalid booking ID');
        }

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            throw new Error('Booking not found');
        }

        return deletedBooking;
    }
}



// Route to get bookings by user ID
router.get('/booking/:userId', async (req, res) => {
    try {
        const bookings = await BookingService.getBookingsByUser(req.params.userId);
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
});

// Route to save booking details
// router.post('/booking/details', async (req, res) => {
//     try {
//         const booking = await BookingService.saveBookingDetails(req.body);
//         req.session.bookingId = booking._id;

//         res.status(201).json({
//             message: 'Booking details saved successfully',
//             bookingId: booking._id,
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
router.post('/booking/details', async (req, res) => {
    const { roomType, guests, checkInDate, checkOutDate, userId ,totalPrice} = req.body;

    // Validate required fields
    if (!roomType || !guests || !checkInDate || !checkOutDate || !userId) {
        return res.status(400).json({ message: 'Room type, guests, check-in date, check-out date, and user ID are required' });
    }

    try {
        // Create a new booking entry with the provided data
        const booking = new Booking({
            roomType: roomType,
            guests: guests,
            checkInDate: new Date(checkInDate),   // Convert string to Date object
            checkOutDate: new Date(checkOutDate), // Convert string to Date object
            user: userId,  // Save userId as reference to the User model
            totalPrice:totalPrice,
        });
        console.log(totalPrice);

        // Save the new booking to the database
        await booking.save();
        req.session.bookingId = booking._id;
        res.status(201).json({
            message: 'Booking details saved successfully',
            bookingId: booking._id,  // Return bookingId for future use (optional)
        });
    } catch (error) {
        console.error('Error saving booking details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to delete a booking
// router.delete('/bookings/:bookingId', async (req, res) => {
//     try {
//         const deletedBooking = await BookingService.deleteBooking(req.params.bookingId);
//         res.status(200).json({ message: 'Booking canceled successfully', deletedBooking });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
router.delete("/bookings/:bookingId", async (req, res) => {
    const bookingId = req.params.bookingId;

    // Check if the bookingId is valid
    if (!bookingId || bookingId === "undefined") {
        return res.status(400).json({ message: "Invalid booking ID" });
    }

    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            console.log('TESTING BOOKING ID:',bookingId )
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (err) {
        console.error("Error deleting booking:", err);
        res.status(500).json({ message: "Error canceling booking" });
    }
});

module.exports = router;
