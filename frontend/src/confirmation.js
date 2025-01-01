import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const userId = localStorage.getItem("userId");
      const bookingId = localStorage.getItem("bookingId");

      if (!userId || !bookingId) {
        alert("User or booking ID not found");
        setLoading(false);
        return;
      }

      try {
        // Fetch booking details for the user
        const response = await fetch(`http://localhost:5000/api/booking/${userId}`);
        const data = await response.json();

        if (response.ok) {
          const latestBooking = data.bookings[data.bookings.length - 1]; // Get the latest booking
          setBookingDetails(latestBooking);

          // Fetch services for this booking using bookingId
          const servicesResponse = await fetch(
            `http://localhost:5000/api/services/${bookingId}`
          );

          const servicesData = await servicesResponse.json();

          if (servicesResponse.ok) {
            setServices(servicesData.services || []);
          } else {
            setError("Failed to fetch services");
          }
        } else {
          setError("Failed to fetch booking details");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      try {
        const userResponse = await fetch(`http://localhost:5000/api/register/${userId}`);
        const userData = await userResponse.json();

        if (!userResponse.ok) throw new Error();

        setUserInfo(userData);
      } catch {
        setError("Failed to fetch profile data.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleSendEmail = async () => {
    setEmailLoading(true);
    setEmailSuccess(false);
    setEmailError(null);
  
    if (!bookingDetails || !userInfo) {
      setEmailError("No booking or user details to send");
      setEmailLoading(false);
      return;
    }
  
    const subject = "Booking Confirmation";
    const message = `
      <h1>Your Booking Details</h1>
      <p>Thank you for booking with us!</p>
      <ul>
        <li>Room Type: ${bookingDetails.roomType}</li>
        <li>Check-in Date: ${new Date(bookingDetails.checkInDate).toLocaleDateString()}</li>
        <li>Check-out Date: ${new Date(bookingDetails.checkOutDate).toLocaleDateString()}</li>
        <li>Total Price: ${bookingDetails.totalPrice} EGP</li>
      </ul>
    `;
  
    // Construct the request body
    const requestBody = {
      to: userInfo?.email,  // Ensure this is not null or undefined
      subject: subject,
      message: message,
    };
  
    console.log("Request Body:", requestBody);  // Log the data you're sending
  
    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Send the request body
      });
  
      if (response.ok) {
        setEmailSuccess(true);
      } else {
        const errorData = await response.text();
        throw new Error(errorData);
      }
    } catch (err) {
      setEmailError(err.message || "Error sending email");
    } finally {
      setEmailLoading(false);
    }
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

  if (!bookingDetails) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Typography variant="h6">No booking found.</Typography>
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
        <Grid item xs={12} sm={8} md={6}>
          <Paper sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
              Booking Confirmation
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
              Booking Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Room Type" secondary={bookingDetails.roomType} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Check-in Date"
                  secondary={new Date(bookingDetails.checkInDate).toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Check-out Date"
                  secondary={new Date(bookingDetails.checkOutDate).toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Number of Guests" secondary={bookingDetails.guests} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Total Price"
                  secondary={`${bookingDetails.totalPrice} EGP`}
                />
              </ListItem>
            </List>

            <Typography variant="h6" color="primary" gutterBottom sx={{ marginTop: 3 }}>
  Services Booked
</Typography>
<List>
  {services.length ? (
    services.map((service, index) => (
      <ListItem key={index}>
        {/* Food Section */}
        <div>
          <Typography variant="h6">Food</Typography>
          <Typography variant="body1">
            <strong>Bundle:</strong> {service.food.bundle || "No Food Bundle"}
          </Typography>
          <Typography variant="body1">
            <strong>Meal Type:</strong> {service.food.mealType || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Price:</strong> {service.food.price || "N/A"}
          </Typography>
        </div>

        {/* Court Section */}
        <div style={{ marginTop: 10 }}>
          <Typography variant="h6">Court</Typography>
          <Typography variant="body1">
            <strong>Type:</strong> {service.court.type || "No Court Type"}
          </Typography>
          <Typography variant="body1">
            <strong>Time:</strong> {service.court.time || "No Court Time"}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {service.court.date ? new Date(service.court.date).toLocaleDateString() : "No Court Date"}
          </Typography>
        </div>

        {/* Gym Section */}
        <div style={{ marginTop: 10 }}>
          <Typography variant="h6">Gym</Typography>
          <Typography variant="body1">
            <strong>Time:</strong> {service.gym.time || "No Gym Time"}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong> {service.gym.date ? new Date(service.gym.date).toLocaleDateString() : "No Gym Date"}
          </Typography>
        </div>
      </ListItem>
    ))
              ) : (
                <ListItem>
                  <ListItemText primary="No services booked" />
                </ListItem>
              )}
            </List>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 3 }}
              onClick={handleSendEmail}
              disabled={emailLoading}
            >
              {emailLoading ? <CircularProgress size={24} /> : "Send Confirmation Email"}
            </Button>

            {emailSuccess && (
              <Typography
                variant="h6"
                color="success"
                sx={{ marginTop: 2, textAlign: "center" }}
              >
                Email sent successfully!
              </Typography>
            )}
            {emailError && (
              <Typography
                variant="h6"
                color="error"
                sx={{ marginTop: 2, textAlign: "center" }}
              >
                Error: {emailError}
              </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/room-Type")}
              >
                Book Another Room
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmationPage;
