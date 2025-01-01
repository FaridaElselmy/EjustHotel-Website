import { Box } from '@mui/material';
import React from 'react';
import MergedSelectComponent from "./components/selectBoxservices";

function Bookservices() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "white",
                padding: "15px 30px",
            }}
        >
            <Box
                sx={{
                    marginBottom: '20px',
                    backgroundColor: 'red',
                    color: 'black',
                    padding: '1px',
                    borderRadius: '8px',
                }}
            >
                <div style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}>
                    <h1>E-Just Services</h1>
                </div>
            </Box>
            <MergedSelectComponent />
        </Box>
    );
}

export default Bookservices;