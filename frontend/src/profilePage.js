import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";

function Profile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem("userId");
            const bookingId = localStorage.getItem("bookingId");

            if (!userId || !bookingId) {
                setError("PLease Sign in First!");
                setLoading(false);
                return;
            }

            try {
                console.log("user: ",userId);
                const userResponse = await fetch(`http://localhost:5000/api/register/${userId}`);
                const userData = await userResponse.json();
                if (!userResponse.ok) throw new Error();



                setUserInfo(userData);

            } catch {
                setError("Failed to fetch profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                {/* User Info Section */}
                <Grid item xs={12} sm={8} md={6}>
                    <Paper sx={{ padding: 3, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
                            User Profile
                        </Typography>

                        <Typography variant="h6" color="primary" gutterBottom>
                            User Information
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Name" secondary={userInfo.Name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Email" secondary={userInfo.email} />
                            </ListItem>
                            
                        </List>
                    </Paper>
                </Grid>

               
            </Grid>
        </Box>
    );
}

export default Profile;
