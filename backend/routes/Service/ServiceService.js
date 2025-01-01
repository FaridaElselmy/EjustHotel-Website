
class ServiceService {
    static async createService({ userId, bookingId, food, court, gym, price }) {
        if (!userId || !bookingId) {
            throw new Error("User ID and Booking ID are required");
        }

        const newService = new Service({
            userId,
            bookingId,
            food,
            court,
            gym,
            price
        });

        return await newService.save();
    }

    static async getServicesByBookingId(bookingId) {
        return await Service.find({ bookingId });
    }
}

module.exports = ServiceService;
