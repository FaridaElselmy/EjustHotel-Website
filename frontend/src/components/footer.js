import { Box, Typography, Grid } from '@mui/material';
import React from 'react';

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                padding: "20px 40px",
                position: "relative",
                width: "100%",
                marginTop: "auto",
            }}
        >
            <Grid container spacing={4}>
                {/* Our Campus Column */}
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "20px", fontSize: '20px', marginTop: "20px" }}>
                        Our Campus
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                        <img src="/icons/location_on_24dp_FFFFFF.png" alt="room_service Logo" style={{ marginRight: '5px', width: '25px', height: '25px' }} />

                        P.O. Box 179, New Borg El-Arab City<br />
                        Postal Code 21934, Alexandria, Egypt
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                        <img src="/icons/phone_24dp_FFFFFF.png" alt="room_service Logo" style={{ marginRight: '5px', width: '25px', height: '25px' }} />
                        Telephone: 16448<br />
                        <img src="/icons/email_24dp_FFFFFF.png" alt="room_service Logo" style={{ marginRight: '5px', width: '25px', height: '25px' }} />

                        Fax: 03-4600004
                    </Typography>
                </Grid>

                {/* Business Hours Column */}
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: '20px', marginBottom: "20px", marginTop: "20px" }}>
                        Business Hours
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                        Sunday - Thursday<br />
                        09:00 am - 04:00 pm
                    </Typography>
                </Grid>

                {/* Cairo Office Column */}
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: "20px", marginTop: "20px", fontSize: '20px', }}>
                        Cairo Office
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                        Concordia Building, B2111, Smart Village<br />
                        Cairo-Alex road, Postal Code 12577, Giza, Egypt
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                        Telephone No.: +2 35371712 / 35371713
                    </Typography>
                </Grid>
            </Grid>

            {/* Copyright */}
            <Typography variant="body2" sx={{ marginTop: "20px", fontSize: "12px", opacity: 0.8 }}>
                © E-JUST, All Right Reserved.            </Typography>
        </Box>
    );
}

export default Footer;

