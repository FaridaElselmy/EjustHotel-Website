import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

function ContactUsPage() {
    return (
        <Box sx={{
            minHeight: "100vh", // Full viewport height
            //backgroundImage: "url('./download.jpg')", // Path to your image in the public folder
            backgroundColor: "white",
            backgroundSize: "cover", // Ensures the image covers the whole area
            padding: "15px 30px",
            backgroundRepeat: "no-repeat", // Prevents repeating
        }}>
            <Box sx={{
                marginBottom: '20px',
                backgroundColor: 'red',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
            }}>
                <h2 sx={{ alignItems: 'center' }}
                > contact us  </h2>
            </Box>

            {/*discription boarder */}
            <Box
                sx={{
                    border: '1px solid #ccc',
                    padding: '16px',
                    borderRadius: '8px',
                    maxWidth: '600px',
                    marginLeft: '20px',  // Aligns the box to the left
                    backgroundColor: '#f9f9f9',
                    width: 'fit-content',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mailing Address</Typography>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                    Egypt-Japan University for Science and Technology (E-JUST)
                </Typography>
                <Typography variant="body1">
                    P.O. Box 179, New Borg El-Arab City Postal Code 21934, Alexandria, Egypt
                </Typography>
                <Typography variant="body1">
                    Call Center: 16448
                </Typography>
                <Typography variant="body1">
                    Fax: 03-4600004
                </Typography>
            </Box>


        </Box >

    );
}

export default ContactUsPage;
