

class AdminService {
    // Get all bookings
    static async getAllBookings() {
        return await Booking.find()
            .populate('user', 'name email') // Populate user details in the booking
            .exec();
    }

    // Admin login
    static async loginAdmin(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        return user;
    }

    // Delete booking by ID
    static async deleteBooking(bookingId) {
        if (!bookingId) {
            throw new Error('Invalid booking ID');
        }
        const result = await Booking.findByIdAndDelete(bookingId);
        if (!result) {
            throw new Error('Booking not found');
        }
        return result;
    }
}

module.exports = AdminService;
