import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Link,
    useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_()#])[A-Za-z\d@$!%*?&]{8,}$/;
const mentorIDRegex = /^BNM\d{4}$/;

export default function MentorRegister() {
    const [showForm, setShowForm] = useState(false);
    const isMobile = useMediaQuery("(max-width:800px)");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mentorID: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        mentorID: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked");
        let validationErrors = {};

        // Validation
        if (!formData.fullName) validationErrors.fullName = "Full Name is required";
        if (!formData.email) validationErrors.email = "Email is required";

        if (!formData.mentorID) {
            validationErrors.mentorID = "Mentor ID is required";
        } else if (!mentorIDRegex.test(formData.mentorID)) {
            validationErrors.mentorID = "Please enter a valid Mentor ID (e.g., BNM0001)";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            validationErrors.password =
                "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
        }

        if (Object.keys(validationErrors).length > 0) {
            console.log("Validation failed", validationErrors);
            setErrors(validationErrors);
            toast.error("Please fix the errors in the form.", {
                autoClose: 3000,
                position: "top-right",
            });
            return;
        }

        setErrors({});
        try {
                        // Sending the form data to the backend
                        const response = await fetch('http://localhost:5002/api/mentor/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        });
        
                        if (response.ok) {
                            toast.success("Registration successful!");
                            console.log("Form submitted", formData);
                            setFormData({ fullName: "", usn: "", email: "", password: "" });
                            setTimeout(() => {
                                navigate("/dashboard");  // Redirect to dashboard
                            }, 1000);  // Delay navigation slightly for better UX
        
                        } else {
                            const errorData = await response.json();
                            toast.error(errorData.message || "An error occurred.");
                        }
                    } catch (error) {
                        toast.error("An error occurred while submitting the form.");
                        console.error("Error submitting form:", error);
                    }
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: 4,
                }}
            >
                <Box sx={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                        Get started today, it's 100% free.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Create an account and connect with a mentor within minutes!
                    </Typography>

                    {!showForm && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowForm(true)}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Sign in with Email
                        </Button>
                    )}

                    {showForm && (
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.fullName)}
                                        helperText={errors.fullName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Mentor ID"
                                        name="mentorID"
                                        placeholder="BNM0001"
                                        value={formData.mentorID}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.mentorID)}
                                        helperText={errors.mentorID}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password}
                                    />
                                </Grid>
                            </Grid>
                            <Button fullWidth variant="contained" color="primary" type="submit">
                                Register
                            </Button>
                        </Box>
                    )}

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Already have an account?{" "}
                        <Link href="/login" underline="hover">
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Grid>

            {!isMobile && (
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        backgroundColor: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        color: "#fff",
                    }}
                >
                    <Box sx={{ maxWidth: 550, width: "100%" }}>
                        <Box sx={{ width: "100%", backgroundColor: "#fff", padding: 4, borderRadius: 6 }}>
                            <Typography variant="h5" fontWeight="bold" mb={2} color="black">
                                Welcome to Career Compass!
                            </Typography>
                            <Typography variant="body1" color="text.primary" mb={2}>
                                Thank you for your interest in volunteering as a Compass mentor...
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}