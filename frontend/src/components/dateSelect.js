// import * as React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Box, TextField, Button } from '@mui/material';

// export default function CustomSlotPropsCallback() {
//     const [checkInDate, setCheckInDate] = React.useState(null);
//     const [checkOutDate, setCheckOutDate] = React.useState(null);

//     const handleCheckInDateChange = (newDate) => {
//         setCheckInDate(newDate);
//     };

//     const handleCheckOutDateChange = (newDate) => {
//         setCheckOutDate(newDate);
//     };

//     const handleSubmit = async () => {
//         if (!checkInDate || !checkOutDate) {
//             alert("Please select both check-in and check-out dates");
//             return;
//         }

//         // Send dates to the backend
//         try {
//             const response = await fetch("http://localhost:5000/api/booking/dates", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ checkInDate: checkInDate.toISOString(), checkOutDate: checkOutDate.toISOString() }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Error occurred");
//             }

//             const data = await response.json();
//             console.log("Dates saved successfully:", data);
//         } catch (error) {
//             console.error("Error saving dates:", error.message);
//             alert(error.message || "Failed to save dates");
//         }
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box
//                 sx={{
//                     paddingLeft: 0,
//                     flexDirection: 'column',
//                     gap: 2,
//                     alignItems: 'center',
//                     marginTop: '20px',
//                 }}
//             >
//                 <DatePicker
//                     label="Check-in Date"
//                     value={checkInDate}
//                     onChange={handleCheckInDateChange}
//                     renderInput={(params) => <TextField {...params} />}
//                 />

//                 <DatePicker
//                     label="Check-out Date"
//                     value={checkOutDate}
//                     onChange={handleCheckOutDateChange}
//                     renderInput={(params) => <TextField {...params} />}
//                 />

//                 <Button onClick={handleSubmit} variant="contained" color="primary">
//                     Submit Dates
//                 </Button>
//             </Box>
//         </LocalizationProvider>
//     );
// }
