import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Button, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Credentials' }];

const BRANDING = {
    logo: (
        <img
            src="./ejustLogoSignin.png"
            alt="E-JUST logo"
            style={{ height: 24 }}
        />
    ),
    title: "to E-JUST Accommodation",
};

export default function BrandingSignInPage() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const signIn = async () => {
        try {
            console.log("Email:", email, "Password:", password);
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Unknown error occurred");
            }
            

            const data = await response.json();
            
            console.log("Login successful:", data);
            if (data.userId) {
                localStorage.setItem("userId", data.userId);
                console.log("userId saved to localStorage:", data.userId);
            }

            // If the email matches the admin's email, redirect to admin dashboard
            if (email === "faridaehab2005@gmail.com") {
                navigate("/adminProfile");
            } else {
                navigate("/room-Type");
            }
        } catch (error) {
            console.error("Error during login:", error.message);
            alert(error.message || "Login failed. Please try again.");
        }
    };

    return (
        <AppProvider branding={BRANDING} theme={theme}>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        gap: theme.spacing(2),
                    }}
                >
                    {/* Sign-In Form */}
                    <SignInPage
                        signIn={async (provider, email, password) => {
                            if (!email || !password) {
                                alert("Email and password are required");
                                return;
                            }
                            await signIn();
                        }}
                        providers={providers}
                        slotProps={{
                            emailField: {
                                value: email,
                                onChange: (e) => setEmail(e.target.value),
                            },
                            passwordField: {
                                value: password,
                                onChange: (e) => setPassword(e.target.value),
                            },
                        }}
                    />

                    {/* Create Account Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/register")}
                        sx={{
                            marginTop: theme.spacing(2),
                            padding: theme.spacing(1.5, 3),
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Container>
        </AppProvider>
    );
}
