import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function RoomType() {

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'white',
                padding: '15px 30px',
            }}
        >
            <Box sx={{ padding: '40px', textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        marginBottom: '30px',
                        backgroundColor: 'red',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '8px',
                    }}
                >
                    Choose Your Accommodation
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {/* Single Room */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: 3,
                                padding: '20px',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                            }}
                        >
                            <Link to="/book-now" style={{ textDecoration: 'none' }}>
                                <img
                                    src="/singleRoom.jpg"
                                    alt="Single Room"
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            </Link>
                            <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                Single Room
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 'bold', color: 'gray', textAlign: 'center' }}
                            >
                                Price: <span style={{ color: 'red' }}>500 LE</span>
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Double Room */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxShadow: 3,
                                padding: '20px',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                            }}
                        >
                            <Link to="/book-now-double" style={{ textDecoration: 'none' }}>
                                <img
                                    src="/doubleRoom.jpg"
                                    alt="Double Room"
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            </Link>
                            <Typography variant="h6" sx={{ marginTop: '10px' }}>
                                Double Room
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 'bold', color: 'gray', textAlign: 'center' }}
                            >
                                Price: <span style={{ color: 'red' }}>600 LE</span>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default RoomType;
