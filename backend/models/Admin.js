class Admin {
    constructor() {
        // Define the schema for the Admin model
        this.adminSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
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
            role: {
                type: String,
                default: "admin", // Default role for admins
            },
        });

        // Pre-save hook to hash the password before saving it to the database
        this.adminSchema.pre('save', async function (next) {
            if (!this.isModified('password')) return next(); // If the password is not modified, skip hashing

            try {
                const salt = await bcrypt.genSalt(10); // Generate a salt
                this.password = await bcrypt.hash(this.password, salt); // Hash the password
                next();
            } catch (error) {
                next(error); // Pass the error to the next middleware
            }
        });

        // Method to compare the password during login
        this.adminSchema.methods.comparePassword = async function (enteredPassword) {
            return await bcrypt.compare(enteredPassword, this.password);
        };

        // Create the Admin model
        this.AdminModel = mongoose.model('Admin', this.adminSchema);
    }

    getModel() {
        return this.AdminModel;
    }
}

module.exports = new Admin().getModel();
