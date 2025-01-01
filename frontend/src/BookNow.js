import React from 'react';
import { Box, Button } from '@mui/material';
import SelectLabelsSingle from './components/selectBox'; // Updated to Single
import { WovenImageList } from './components/ImageList';

function BookNow() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'white',
                padding: '15px 30px',
            }}
        >
            <Box
                sx={{
                    marginBottom: '20px',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                }}
            >
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <h1>E-Just Hotel Guest House</h1>
                </div>
            </Box>

            {/* Flexbox layout: Booking Table + Image Gallery */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                }}
            >
                {/* Left Column: Booking Form */}
                <Box
                    sx={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        boxShadow: 3,
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        height: 'auto',
                        minHeight: '200px',
                    }}
                >
                    <h3 style={{ textAlign: 'left', marginBottom: '16px' }}>Book Your Stay</h3>
                    <SelectLabelsSingle />
                    {/* Room Description */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                boxShadow: 3,
                                                padding: '20px',
                                                borderRadius: '8px',
                                                backgroundColor: 'white',
                                                width: '100%',
                                                marginTop: '20px',
                                            }}
                                        >
                                            <h3>Deluxe Single Room</h3>
                                            <p>
                                            singleroom Meals can be prepared in the kitchenette, which has an oven, a microwave, a tea and coffee maker and a toaster. 
                                            The spacious double room features air conditioning, a minibar, a terrace with a quiet street view as well as a private bathroom boasting a bath. The unit has 1 bed.
                                            </p>
                                        </Box>

                    {/* Description and Facilities under the booking form */}
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ textAlign: 'left', marginBottom: '16px' }}>Facilities of E-Just Hotel Borg El Arab</h3>
                        <p style={{ lineHeight: '3', textAlign: 'left', marginBottom: '20px' }}>
                            Most popular facilities
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/room_service_g.png" alt="room_service Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Room service
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/local_parking.png" alt="Free parking Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Free parking
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/assist_walker_24dp_48752C.png" alt="Disabled facilities Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Facilities for disabled guests
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/wifi.png" alt="Free Wifi Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Free Wifi
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/smoke_free_24dp_48752C.png" alt="Non-smoking rooms Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Non-smoking rooms
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/coffee_maker_24dp_48752C.png" alt="Tea/Coffee Maker Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Tea/Coffee Maker in All Rooms
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/icons/free_breakfast_24dp_48752C.png" alt="Breakfast Logo" style={{ marginRight: '10px', width: '35px', height: '35px' }} />
                                    Breakfast
                                </li>
                            </ul>
                        </p>
                    </div>
                </Box>

                {/* Right Column: Image Gallery */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                    }}
                >
                    <h3 style={{ textAlign: 'left', marginBottom: '16px' }}>Room Images</h3>
                    <WovenImageList />
                </Box>
            </Box>
        </Box>
    );
}

export default BookNow;
