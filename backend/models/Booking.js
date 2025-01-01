//const mongoose = require('mongoose');

// // Define the booking schema
// const bookingSchema = new mongoose.Schema({
//     roomType: {
//         type: String,
//         required: false,
//     },
//     guests: {
//         type: Number,
//         required: false,
//     },
//     checkInDate: {
//         type: Date,
//         required: false,
//     },
//     checkOutDate: {
//         type: Date,
//         required: false,
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Users',  // Reference to the User model
//         required: false,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     totalPrice:{
//         type:Number,
//         required:false,
//     },
// });
// bookingSchema.methods.toJSON = function () {
//     const userObject = this.toObject();
//     userObject.bookingId = userObject._id; // Add userId to the response
//     delete userObject._id; // Optionally remove _id field
//     return userObject;
// };


// module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

class Booking {
    constructor() {
        // Define the booking schema
        this.bookingSchema = new mongoose.Schema({
            roomType: {
                type: String,
                required: false,
            },
            guests: {
                type: Number,
                required: false,
            },
            checkInDate: {
                type: Date,
                required: false,
            },
            checkOutDate: {
                type: Date,
                required: false,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Ensure this matches the User model
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now, // Automatically sets the creation date
            },
            totalPrice: {
                type: Number,
                required: false, // You can set true if it is mandatory
            },
        });

        // Custom method to format the response
        this.bookingSchema.methods.toJSON = function () {
            const userObject = this.toObject();
            userObject.bookingId = userObject._id; // Add userId to the response
            delete userObject._id; // Optionally remove _id field
            return userObject;
        };

        // Create the Booking model
        this.BookingModel = mongoose.model('Booking', this.bookingSchema);
    }

    getModel() {
        return this.BookingModel;
    }
}

module.exports = new Booking().getModel();
