import * as React from 'react';
import { InputLabel, MenuItem, FormHelperText, FormControl, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import Snackbar from "@mui/material/Snackbar";
import  { useState } from "react";
export default function CombinedSelectors() {
    const [foodBundle, setFoodBundle] = React.useState('');
    const [mealType, setMealType] = React.useState('');
    const [customPeriod, setCustomPeriod] = React.useState('');
    const [court, setCourt] = React.useState('');
    const [timeCourt, setTimeCourt] = React.useState('');
    const [gymTime, setGymTime] = React.useState('');
    const [courtDate, setCourtDate] = React.useState(null);
    const [gymDate, setGymDate] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [price, setPrice] = React.useState(0); // Store price for food only
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate(); 

    const handleFoodBundleChange = (event) => {
        const value = event.target.value;
        if (value === 'custom') {
            setDialogOpen(true);
        } else {
            setFoodBundle(value);
        }
    };

    const handleMealTypeChange = (event) => setMealType(event.target.value);
    const handleCourtChange = (event) => setCourt(event.target.value);
    const handleCourtTimeChange = (event) => setTimeCourt(event.target.value);
    const handleGymTimeChange = (event) => setGymTime(event.target.value);
    const handleCourtDateChange = (newDate) => setCourtDate(newDate);
    const handleGymDateChange = (newDate) => setGymDate(newDate);

    const handleDialogClose = () => setDialogOpen(false);

    const handleDialogSave = () => {
        if (customPeriod) {
            setFoodBundle(`Custom (${customPeriod} days)`);
        }
        setDialogOpen(false);
    };

    const calculateFoodPrice = () => {
        const customPeriodValue = parseInt(customPeriod, 10);
        let calculatedPrice = 0;

        if (foodBundle === 'monthly' && mealType === 'breakfast-lunch-dinner') calculatedPrice = 5100;
        if (foodBundle === '22-days' && mealType === 'breakfast-lunch-dinner') calculatedPrice = 3740;
        if (foodBundle === 'monthly' && mealType === 'lunch') calculatedPrice = 3000;
        if (foodBundle === '22-days' && mealType === 'lunch') calculatedPrice = 3000;
        if (foodBundle.includes('Custom') && mealType === 'breakfast-lunch-dinner' && customPeriodValue) calculatedPrice = customPeriodValue * 170;
        if (foodBundle.includes('Custom') && mealType === 'lunch' && customPeriodValue) calculatedPrice = customPeriodValue * 100;

        return calculatedPrice;
    };

    const handleSubmit = async () => {
        const bookingId = localStorage.getItem('bookingId');
        const userId = localStorage.getItem('userId');
    
        const bookingDetails = {
            bookingId,
            userId,
            food: { bundle: foodBundle, customPeriod, mealType,price },
            court: { type: court, time: timeCourt, date: courtDate },
            gym: { time: gymTime, date: gymDate },
            // Include food price only in the booking details
        };
    
        try {
            console.log("TEST SERVICES: ", bookingDetails);
            const response = await fetch('http://localhost:5000/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingDetails),
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log('Booking saved:', data);
                setSnackbarMessage("Booking saved successfully!");
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate('/confirmation', { state: { bookingDetails } });
                },2000);
            }
        } catch (error) {
            console.error('Error saving booking:', error);
        }
    };

    React.useEffect(() => {
        setPrice(calculateFoodPrice()); // Update the price when any food option changes
    }, [foodBundle, mealType, customPeriod]);

    return (
        <div>
            

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, marginBottom: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Food Bundle</Typography>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="food-bundle-select-label">Food Bundle</InputLabel>
                            <Select
                                labelId="food-bundle-select-label"
                                id="food-bundle-select"
                                value={foodBundle}
                                label="Food Bundle"
                                onChange={handleFoodBundleChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="monthly">Monthly (30 days)</MenuItem>
                                <MenuItem value="22-days">22 Days</MenuItem>
                                <MenuItem value="custom">Custom</MenuItem>
                            </Select>
                            <FormHelperText>Choose the food bundle</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="meal-type-select-label">Meal Type</InputLabel>
                            <Select
                                labelId="meal-type-select-label"
                                id="meal-type-select"
                                value={mealType}
                                label="Meal Type"
                                onChange={handleMealTypeChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="lunch">Lunch</MenuItem>
                                <MenuItem value="breakfast-lunch-dinner">Breakfast + Lunch + Dinner</MenuItem>
                            </Select>
                            <FormHelperText>Select meal type</FormHelperText>
                        </FormControl>

                        {foodBundle && mealType && (
                            <Typography sx={{ m: 2, fontWeight: 'bold' }}>
                                Total Price: {price} EGP
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, marginBottom: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Court Type</Typography>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="court-select-label">Court Type</InputLabel>
                            <Select
                                labelId="court-select-label"
                                id="court-select"
                                value={court}
                                label="Court Type"
                                onChange={handleCourtChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="tennis">Tennis</MenuItem>
                                <MenuItem value="basketball">Basketball</MenuItem>
                                <MenuItem value="football">Football</MenuItem>
                                <MenuItem value="volleyball">Volleyball</MenuItem>
                            </Select>
                            <FormHelperText>Choose your court</FormHelperText>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="time-court-select-label">Time</InputLabel>
                            <Select
                                labelId="time-court-select-label"
                                id="time-court-select"
                                value={timeCourt}
                                label="Time"
                                onChange={handleCourtTimeChange}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="5-6">5-6</MenuItem>
                                <MenuItem value="6-7">6-7</MenuItem>
                                <MenuItem value="8-9">8-9</MenuItem>
                            </Select>
                            <FormHelperText>Choose court time</FormHelperText>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Court Date"
                                value={courtDate}
                                onChange={handleCourtDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, marginBottom: 2, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Gym Time</Typography>
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel id="gym-time-select-label">Gym Time</InputLabel>
                    <Select
                        labelId="gym-time-select-label"
                        id="gym-time-select"
                        value={gymTime}
                        label="Gym Time"
                        onChange={handleGymTimeChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="5-6">5-6</MenuItem>
                        <MenuItem value="6-7">6-7</MenuItem>
                        <MenuItem value="8-9">8-9</MenuItem>
                    </Select>
                    <FormHelperText>Choose your gym time</FormHelperText>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Gym Date"
                        value={gymDate}
                        onChange={handleGymDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </LocalizationProvider>
            </Box>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Set Custom Period</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter the custom period for the food bundle (in days):</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="custom-period"
                        label="Custom Period"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={customPeriod}
                        onChange={(e) => setCustomPeriod(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleDialogSave} disabled={!customPeriod}>Save</Button>
                </DialogActions>
            </Dialog>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit Booking
            </Button>
            {/* Snackbar for messages */}
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                  />
        </div>
    );
}
