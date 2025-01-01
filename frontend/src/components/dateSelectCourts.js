// import * as React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Box, TextField } from '@mui/material';

// export default function CourtDateSelect() {
//     const [checkInDate, setCheckInDate] = React.useState(null);  // State for check-in date

//     // Handle check-in date change
//     const handleCheckInDateChange = (newDate) => {
//         setCheckInDate(newDate);
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
//                 {/* Check-in Date Picker */}
//                 <DatePicker
//                     label="choose day "
//                     value={checkInDate}
//                     onChange={handleCheckInDateChange}
//                     slotProps={{
//                         openPickerIcon: (ownerState) => ({
//                             color: ownerState.open ? 'secondary' : 'primary',
//                         }),
//                     }}
//                     renderInput={(params) => <TextField {...params} />}
//                 />

//             </Box>
//         </LocalizationProvider>
//     );
// }
import React, { Component } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';

class CourtDateSelect extends Component {
    constructor(props) {
        super(props);
        // Initialize state with check-in date as null
        this.state = {
            checkInDate: null,
        };
    }

    // Handle check-in date change
    handleCheckInDateChange = (newDate) => {
        this.setState({ checkInDate: newDate });
    };

    render() {
        const { checkInDate } = this.state;

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    sx={{
                        paddingLeft: 0,
                        flexDirection: 'column',
                        gap: 2,
                        alignItems: 'center',
                        marginTop: '20px',
                    }}
                >
                    {/* Check-in Date Picker */}
                    <DatePicker
                        label="Choose day"
                        value={checkInDate}
                        onChange={this.handleCheckInDateChange}
                        slotProps={{
                            openPickerIcon: (ownerState) => ({
                                color: ownerState.open ? 'secondary' : 'primary',
                            }),
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
            </LocalizationProvider>
        );
    }
}

export default CourtDateSelect;
