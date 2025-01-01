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
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

class BookingManager {
  constructor(roomType, checkInDate, checkOutDate, guests) {
    this.roomType = roomType;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.guests = guests;
  }

  calculateTotalPrice() {
    if (this.checkInDate && this.checkOutDate) {
      const checkIn = this.checkInDate.toDate();
      const checkOut = this.checkOutDate.toDate();
      const timeDifference = checkOut - checkIn;
      const daysBooked = timeDifference / (1000 * 3600 * 24);
      return daysBooked * 500; // Price per day
    }
    return 0;
  }

  validateDates() {
    if (!this.checkInDate || !this.checkOutDate) {
      return { isValid: false, message: "Please select both check-in and check-out dates." };
    }
    if (this.checkOutDate.isBefore(this.checkInDate)) {
      return { isValid: false, message: "Check-out date cannot be earlier than check-in date." };
    }
    return { isValid: true, message: "" };
  }
}

export default function SelectLabelsSingle() {
  const [roomType, setRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests] = useState(1);
  const [error, setError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
    const bookingManager = new BookingManager(roomType, checkInDate, checkOutDate, guests);
    const validation = bookingManager.validateDates();

    if (!roomType || !checkInDate || !checkOutDate) {
      setError(true);
      setSnackbarMessage("Please complete all fields.");
      setSnackbarOpen(true);
      return;
    }

    if (!validation.isValid) {
      setSnackbarMessage(validation.message);
      setSnackbarOpen(true);
      return;
    }

    const totalPrice = bookingManager.calculateTotalPrice();
    setTotalPrice(totalPrice);
    setSnackbarMessage(`Your total price is ${totalPrice} EGP`);
    setSnackbarOpen(true);

    const userId = localStorage.getItem("userId");
    const requestBody = {
      roomType,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      guests,
      userId,
      totalPrice,
    };

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
        setSnackbarMessage("Booking details submitted successfully!");
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
      setSnackbarMessage("User not logged in.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/booking/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setBookings(data.bookings);
        setOpen(true);
      } else {
        setSnackbarMessage(data.message || "Failed to fetch bookings.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(error.message || "Failed to fetch bookings.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "0 auto", paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth error={error}>
            <InputLabel>Room Type</InputLabel>
            <Select value={roomType} label="Room Type" onChange={handleRoomChange}>
              <MenuItem value="Single King Room">Single King Room</MenuItem>
              <MenuItem value="Deluxe Single Room">Deluxe Single Room</MenuItem>
            </Select>
            {error && <FormHelperText>Room type is required</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-in Date"
              value={checkInDate}
              onChange={handleCheckInDateChange}
              renderInput={(props) => <TextField {...props} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-out Date"
              value={checkOutDate}
              onChange={handleCheckOutDateChange}
              renderInput={(props) => <TextField {...props} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={handleShowBookings}>
            Show Bookings
          </Button>
        </Grid>
      </Grid>

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
