import { Box } from '@mui/material';
import React from 'react';


function FacilitiesPage() {
    return (
        <Box sx={{
            minHeight: "100vh", // Full viewport height
            //backgroundImage: "url('./download.jpg')", // Path to your image in the public folder
            backgroundColor: "white",
            backgroundSize: "cover", // Ensures the image covers the whole area
            padding: "15px 30px",
            backgroundRepeat: "no-repeat", // Prevents repeating
        }}>
            <Box
                sx={{
                    marginBottom: '20px',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '1px',
                    borderRadius: '8px',
                }}
            >
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>E-Just activites / services</h1>
                </div>
            </Box>
            <Box
                sx={{
                    position: 'top', // Position relative to the parent or page
                    top: 0,
                    width: '99%',
                    boxShadow: 3,
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    marginTop: '0px',
                    overflowY: 'auto', // Ensure content scrolls if it's long
                }}
            >
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Bathroom</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Toilet paper</li>
                            <li>Towels</li>
                            <li>Bathtub or shower</li>
                            <li>Private Bathroom</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Toilet</li>
                            <li>Free toiletries</li>
                            <li>Bathtub</li>
                            <li>Shower</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Bedroom</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Wardrobe or closet</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Outdoors</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Balcony</li>
                            <li>Terrace</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Garden</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Kitchen</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Electric kettle</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Room Amenities</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Clothes rack</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Media & Technology</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Flat-screen TV</li>
                            <li>Satellite channels</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Telephone</li>
                            <li>TV</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Food & Drink</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Minibar</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Tea/Coffee maker</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Internet</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                        <li>Wifi is available in all areas and is free of charge.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Parking</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Free private parking is available on site (reservation is not needed).</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Parking garage</li>
                            <li>Accessible parking</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Services</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Daily housekeeping</li>
                            <li>Shared lounge/TV area</li>
                            <li>Baggage storage</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Laundry</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Safety & Security</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Fire extinguishers</li>
                            <li>Smoke alarms</li>
                            <li>Security alarm</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Key access</li>
                            <li>24-hour security</li>
                        </ul>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>General</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Air conditioning</li>
                            <li>Non-smoking throughout</li>
                            <li>Smoke-free property</li>
                        </ul>
                        <ul
                            style={{
                                listStyleType: 'none',
                                padding: 0,
                                margin: 0,
                                width: '48%',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                                fontSize: '0.9rem',
                            }}
                        >
                            <li>Elevator</li>
                            <li>Family rooms</li>
                            <li>Non-smoking rooms</li>
                        </ul>
                    </div>
                </div>
            </Box>
        </Box >

    );
}

export default FacilitiesPage;
