import React from 'react';
import { Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Functional wrapper component to provide navigate to class component
const RegistrationPageWrapper = () => {
    const navigate = useNavigate(); // Get navigate from the useNavigate hook
    return <RegistrationPageWithNavigate navigate={navigate} />;
};

// Class-based component using OOP approach
class RegistrationPageWithNavigate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            Name: '',
            confirmPassword: '',
            isEjustStudent: '',
            studentId: '',
        };
    }

    // Helper function to validate the password
    validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/;
        return passwordRegex.test(password);
    };

    // Method for registering a new user
    register = async () => {
        const { Name, email, password, confirmPassword, isEjustStudent, studentId } = this.state;
    
        // Validate form inputs
        if (!this.validatePassword(password)) {
            alert("Password must be at least 6 characters long, contain a lowercase letter, an uppercase letter, and a special character (e.g., !@#$%).");
            return; // Stop execution if validation fails
        }
    
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return; // Stop execution if validation fails
        }
    
        if (isEjustStudent === 'yes' && !studentId) {
            alert("Please enter your Student ID.");
            return; // Stop execution if validation fails
        }
    
        try {
            // Proceed with the API call only if all validations pass
            this.setState({ processing: true });
    
            const payload = { Name, email, password, isEjustStudent, studentId };
            console.log("PAYLOAD:",payload);
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Unknown error occurred");
            }
    
            const data = await response.json();
            localStorage.setItem("userId", data.userId);
            this.props.navigate("/signinPage");
        } catch (error) {
            console.error("Error during registration:", error.message);
            alert(error.message || "Registration failed. Please try again.");
        } finally {
            this.setState({ processing: false }); // Reset processing state
        }
    };
    
    

    // Handler for form input changes
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { email, password, confirmPassword, Name, isEjustStudent, studentId } = this.state;

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 3,
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    width: '100%',
                    maxWidth: '600px',
                    margin: 'auto',
                    marginTop: '20px',
                    height: 'auto',
                    minHeight: '200px',
                    '@media (max-width:600px)': {
                        width: '90%',
                        padding: '16px',
                    },
                }}
            >
                <img
                    src="ejustLogoSignin.png"
                    alt="Logo"
                    style={{
                        width: '70px',
                        height: 'auto',
                        marginBottom: '16px',
                    }}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                    Create an Account
                </Typography>
                <TextField
                    label="Name"
                    name="Name"
                    fullWidth
                    value={Name}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="ejust-student-label">Are you an EJUST student?</InputLabel>
                    <Select
                        labelId="ejust-student-label"
                        name="isEjustStudent"
                        value={isEjustStudent}
                        onChange={this.handleChange}
                    >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                </FormControl>
                {isEjustStudent === 'yes' && (
                    <TextField
                        label="Student ID"
                        name="studentId"
                        type="text"
                        fullWidth
                        value={studentId}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.register}
                    disabled={this.state.processing}
                    style={{ marginTop: 16 }}
                >
                    Register
                </Button>
            </Box>
        );
    }
}

export default RegistrationPageWrapper;
