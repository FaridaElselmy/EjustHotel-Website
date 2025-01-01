import React, { useEffect, useState, useMemo } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

class BookingManager {
    constructor(apiBase) {
        this.apiBase = apiBase;
    }

    async fetchAllBookings() {
        const response = await fetch(`${this.apiBase}/api/admin/bookings`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch bookings data");
        }
        return await response.json();
    }

    async fetchUserDetails(userId) {
        const response = await fetch(`${this.apiBase}/api/register/${userId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch user data");
        }
        return await response.json();
    }

    async getBookingsWithUserDetails() {
        try {
            const bookings = await this.fetchAllBookings();
            return await Promise.all(
                bookings.map(async (booking) => {
                    if (!booking.user._id) {
                        return { ...booking, user: { name: "Unknown", email: "Unavailable" } };
                    }
                    try {
                        const user = await this.fetchUserDetails(booking.user._id);
                        return { ...booking, user };
                    } catch {
                        return { ...booking, user: { name: "Unknown", email: "Unavailable" } };
                    }
                })
            );
        } catch (error) {
            throw new Error(error.message || "Error fetching data.");
        }
    }

    async deleteBooking(bookingId) {
        const response = await fetch(`${this.apiBase}/api/admin/bookings/${bookingId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete booking");
        }

        return await response.json(); // Assuming the server returns a success message
    }
}

function AdminProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const bookingManager = useMemo(() => new BookingManager("http://localhost:5000"), []);

    const loadBookings = async () => {
        try {
            const bookingsWithUserDetails = await bookingManager.getBookingsWithUserDetails();
            setBookings(bookingsWithUserDetails);
        } catch (err) {
            console.error("Error loading bookings:", err);
            setError(err.message || "Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, [bookingManager]);

    const handleDelete = async (bookingId) => {
        try {
            await bookingManager.deleteBooking(bookingId);
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking.bookingId !== bookingId)
            );
            setSnackbar({ open: true, message: "Booking deleted successfully", severity: "success" });
            loadBookings(); // Refresh bookings list
        } catch (err) {
            console.error("Error deleting booking:", err);
            setSnackbar({ open: true, message: err.message || "Failed to delete booking", severity: "error" });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 3 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: "url('./background2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                padding: 4,
            }}
        >
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Paper
                        sx={{
                            padding: 3,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }}
                    >
                        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
                            Admin Dashboard: All Bookings
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ marginBottom: 3 }}>
                            Below is a list of all bookings and their associated user information.
                        </Typography>
                        {bookings.length > 0 ? (
                            <List>
                                {bookings.map((booking) => (
                                    <React.Fragment key={booking.bookingId}>
                                        <ListItem>
                                            <ListItemText primary="Booking ID" secondary={booking.bookingId} />
                                            <IconButton
                                                edge="end"
                                                color="error"
                                                onClick={() => handleDelete(booking.bookingId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText primary="User Email" secondary={booking.user.email} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Room Type" secondary={booking.roomType} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Check-In Date"
                                                secondary={new Date(booking.checkInDate).toLocaleDateString()}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Check-Out Date"
                                                secondary={new Date(booking.checkOutDate).toLocaleDateString()}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Number of Guests" secondary={booking.guests} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Total Price" secondary={`$${booking.totalPrice}`} />
                                        </ListItem>
                                        <Divider sx={{ marginY: 2 }} />
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="h6" align="center" color="textSecondary">
                                No bookings found.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminProfile;
