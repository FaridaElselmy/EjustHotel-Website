import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import './App.css';
import MyAppBar from './components/AppBar';
import BookNow from './BookNow'; // Make sure you have this component


function home() {
    return (
        <Router>
            <Box
                sx={{
                    minHeight: "100vh", // Full viewport height
                    backgroundImage: "url('./background2.jpg')", // Path to your image in the public folder
                    backgroundSize: "cover", // Ensures the image covers the whole area
                    backgroundPosition: "center", // Centers the image
                    backgroundRepeat: "no-repeat", // Prevents repeating
                }}
            >

                <MyAppBar />


                <Routes>

                    <Route path="/" element={
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: 'calc(100vh - 64px)', // Leaves space for AppBar
                            }}
                        >

                            <Link to="/book-now">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "grey",
                                        color: "white",
                                        padding: "35px 30px",
                                        fontSize: "18px",
                                    }}
                                >
                                    <h1>BOOK Your Accomidation NOW!</h1>
                                </Button>
                            </Link>
                        </Box>
                    } />

                    <Route path="/book-now" element={<BookNow />} />
                    <Route path="/Signin" element={<signin />} />
                </Routes>
            </Box>
        </Router>
    );
}

export default home;
