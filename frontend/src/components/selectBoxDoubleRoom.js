import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

class BookingHandler {
  constructor(roomType, checkInDate, checkOutDate, guests, userId) {
    this.roomType = roomType;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guests = guests;
    this.userId = userId;
  }

  isValidDates() {
    if (!this.checkInDate || !this.checkOutDate) return false;
    return this.checkOutDate.isAfter(this.checkInDate);
  }

  calculateTotalPrice() {
    if (this.isValidDates()) {
      const checkIn = this.checkInDate.toDate();
      const checkOut = this.checkOutDate.toDate();
      const timeDifference = checkOut - checkIn;
      const daysBooked = timeDifference / (1000 * 3600 * 24);
      return daysBooked * 600;
    }
    return 0;
  }

  createBookingRequest() {
    return {
      roomType: this.roomType,
      checkInDate: this.checkInDate.toISOString(),
      checkOutDate: this.checkOutDate.toISOString(),
      guests: this.guests,
      userId: this.userId,
      totalPrice: this.calculateTotalPrice(),
    };
  }
}

export function SelectLabelsDouble() {
  const [roomType, setRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const handleRoomChange = (event) => {
    setRoomType(event.target.value);
    setError(false);
  };

  const handleCheckInDateChange = (newDate) => {
    setCheckInDate(newDate);
  };

  const handleCheckOutDateChange = (newDate) => {
    setCheckOutDate(newDate);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const bookingHandler = new BookingHandler(roomType, checkInDate, checkOutDate, 2, userId);

    if (!roomType || !checkInDate || !checkOutDate) {
      setError(true);
      setSnackbarMessage("Please complete all fields.");
      setSnackbarOpen(true);
      return;
    }

    if (!bookingHandler.isValidDates()) {
      setError(true);
      setSnackbarMessage("Check-out date must be after check-in date.");
      setSnackbarOpen(true);
      return;
    }

    const requestBody = bookingHandler.createBookingRequest();

    try {
      const response = await fetch("http://localhost:5000/api/booking/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        setSnackbarMessage(`Booking confirmed! Total: ${requestBody.totalPrice} EGP`);
        setSnackbarOpen(true);
        setTimeout(() => {
          localStorage.setItem("bookingId", data.bookingId);
          navigate("/Bookservices");
        }, 2000);
      } else {
        setSnackbarMessage(data.message || "Failed to submit booking details.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(error.message || "Failed to submit booking details.");
      setSnackbarOpen(true);
    }
  };

  const handleShowBookings = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/booking/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings);
        setOpen(true);
      } else {
        alert(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message || "Failed to fetch bookings");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", paddingTop: 3 }}>
      <FormControl fullWidth error={error}>
        <InputLabel>Room Type</InputLabel>
        <Select value={roomType} label="Room Type" onChange={handleRoomChange}>
          <MenuItem value="Deluxe Double Room">Deluxe Double Room</MenuItem>
        </Select>
        {error && <FormHelperText>Room type is required</FormHelperText>}
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Check-in Date"
          value={checkInDate}
          onChange={handleCheckInDateChange}
          renderInput={(props) => <TextField {...props} fullWidth sx={{ marginTop: 2 }} />}
        />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Check-out Date"
          value={checkOutDate}
          onChange={handleCheckOutDateChange}
          renderInput={(props) => <TextField {...props} fullWidth sx={{ marginTop: 2 }} />}
        />
      </LocalizationProvider>

      <Button variant="contained" fullWidth sx={{ marginTop: 3 }} onClick={handleSubmit}>
        Submit
      </Button>

      <Button variant="outlined" fullWidth sx={{ marginTop: 3 }} onClick={handleShowBookings}>
        Show Bookings
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Your Bookings</DialogTitle>
        <DialogContent>
          <List>
            {bookings.map((booking, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Room Type: ${booking.roomType}`}
                  secondary={`Check-in: ${booking.checkInDate}, Check-out: ${booking.checkOutDate}, Total Price: ${booking.totalPrice}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
