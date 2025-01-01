// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // Define the schema for the User model
// const userSchema = new mongoose.Schema({
//     Name:{
//         type:String,
//         required:false,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, // Ensure the email is unique in the database
//         lowercase: true,
//         trim: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     studentId:{
//         type:String,
//         required:false,
//     },
//     resetToken: String,
//     resetTokenExpiration: Date,
// });

// // Pre-save hook to hash the password before saving it to the database
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // If the password is not modified, skip hashing

//     try {
//         const salt = await bcrypt.genSalt(10); // Generate a salt
//         this.password = await bcrypt.hash(this.password, salt); // Hash the password
//         next();
//     } catch (error) {
//         next(error); // Pass the error to the next middleware
//     }
// });

// // Method to compare the password during login
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// // Modify the response to include userId in place of _id
// userSchema.methods.toJSON = function () {
//     const userObject = this.toObject();
//     userObject.userId = userObject._id; // Add userId to the response
//     delete userObject._id; // Optionally remove _id field
//     return userObject;
// };

// module.exports = mongoose.model('Users', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

class User {
    constructor() {
        // Define the schema for the User model
        this.userSchema = new mongoose.Schema({
            Name: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: true,
                unique: true, // Ensure the email is unique in the database
                lowercase: true,
                trim: true,
            },
            password: {
                type: String,
                required: true,
            },
            studentId: {
                type: String,
                required: false,
            },
            resetToken: {
                type: String,
            },
            resetTokenExpiration: {
                type: Date,
            },
        });

        // Pre-save hook to hash the password before saving it to the database
        this.userSchema.pre('save', async function (next) {
            if (!this.isModified('password')) return next(); // Skip hashing if password is not modified

            try {
                const salt = await bcrypt.genSalt(10); // Generate salt
                this.password = await bcrypt.hash(this.password, salt); // Hash the password
                next();
            } catch (error) {
                next(error); // Pass error to middleware
            }
        });

        // Method to compare the password during login
        this.userSchema.methods.comparePassword = async function (enteredPassword) {
            return await bcrypt.compare(enteredPassword, this.password);
        };

        // toJSON method to modify the returned user data
        this.userSchema.methods.toJSON = function () {
            const userObject = this.toObject();
            userObject.userId = userObject._id; // Add userId to the response
            delete userObject._id; // Optionally remove _id field
            return userObject;
        };

        // Create the User model
        this.UserModel = mongoose.model('User', this.userSchema);
    }

    getModel() {
        return this.UserModel;
    }
}

module.exports = new User().getModel();

