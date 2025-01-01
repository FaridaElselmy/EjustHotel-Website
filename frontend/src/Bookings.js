import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Bookings() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                setError("User ID not found.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/booking/${userId}`);
                const data = await response.json();
                console.log("Bookings fetched:", data.bookings);

                if (response.ok) {
                    setBookings(data.bookings);
                } else {
                    alert(data.message || "Failed to fetch bookings");
                }
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Failed to fetch bookings data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        // const bookingId = localStorage.getItem("bookingId");
        console.log("Booking ID passed to handleCancelBooking:", bookingId);

        if (!bookingId) {
            alert("Invalid booking ID.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/bookings/${bookingId}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking._id !== bookingId)
                );
                alert("Booking canceled successfully.");
            } else {
                const data = await response.json();
                alert(data.message || "Failed to cancel booking. Please try again.");
            }
        } catch (err) {
            console.error("Error canceling booking:", err);
            alert("Error connecting to the server. Please try again later.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
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
            <Grid container spacing={2} justifyContent="center">
                {/* Bookings Section */}
                {bookings.length > 0 ? (
                    <Grid item xs={12} sm={8} md={6}>
                        <Paper sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                            <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
                                Your Bookings
                            </Typography>
                            <List>
                                {bookings.map((booking) => {
                                    console.log("Booking object:", booking); // Log each booking to check _id
                                    return (
                                        <React.Fragment key={booking.bookingId}>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => {
                                                    console.log(`Deleting booking with ID: ${booking.bookingId}`);
                                                    handleCancelBooking(booking.bookingId);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <ListItem>
                                                <ListItemText primary="Room Type" secondary={booking.roomType} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Check-in Date"
                                                    secondary={new Date(booking.checkInDate).toLocaleDateString()}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Check-out Date"
                                                    secondary={new Date(booking.checkOutDate).toLocaleDateString()}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Number of Guests" secondary={booking.guests} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary="Room Price" secondary={`$${booking.totalPrice}`} />
                                            </ListItem>
                                        </React.Fragment>
                                    );
                                })}
                            </List>
                        </Paper>
                    </Grid>
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No bookings found.
                    </Typography>
                )}
            </Grid>
            
        </Box>
    );
}

export default Bookings;
