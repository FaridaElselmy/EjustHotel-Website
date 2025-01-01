// const mongoose = require("mongoose");

// const serviceSchema = new mongoose.Schema({
//     userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',  // Reference to the User model
//             required: true,
//     },
//     bookingId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Booking',  // Reference to the User model
//             required: true,
//     },
//     food: {
//         bundle: { type: String, required: false },
//         customPeriod: { type: Number, required: false },
//         mealType: { type: String, required: false },
//         price: { type: Number, required: false }
//     },
//     court: {
//         type: { type: String, required: false },
//         time: { type: String, required: false },
//         date: { type: Date, required: false },
//     },
//     gym: {
//         time: { type: String, required: false },
//         date: { type: Date, required: false },
//     },
    
// });

// module.exports = mongoose.model("Service", serviceSchema);
const mongoose = require('mongoose');

class Service {
    constructor() {
        // Define the service schema
        this.serviceSchema = new mongoose.Schema({
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            bookingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booking',
                required: true,
            },
            food: {
                bundle: { type: String, required: false },
                customPeriod: { type: Number, required: false },
                mealType: { type: String, required: false },
                price: { type: Number, required: false },
            },
            court: {
                type: { type: String, required: false },
                time: { type: String, required: false },
                date: { type: Date, required: false },
            },
            gym: {
                time: { type: String, required: false },
                date: { type: Date, required: false },
            },
        });

        // Create the Service model
        this.ServiceModel = mongoose.model('Service', this.serviceSchema);
    }

    getModel() {
        return this.ServiceModel;
    }
}

// Directly export the model
module.exports = mongoose.model('Service', new Service().serviceSchema);
