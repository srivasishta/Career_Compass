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

const emailRegex = /^[a-z]@bnmit\.in$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_()#])[A-Za-z\d@$!%*?&]{8,}$/;
const mentorIDRegex = /^BNM\d{4}$/;

export default function MentorRegister() {
    const [showForm, setShowForm] = useState(false);
    const isMobile = useMediaQuery("(max-width:800px)");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
            e.preventDefault();
            let validationErrors = {};
    
            // Validation Logic
            if (!formData.fullName) validationErrors.fullName = "Full Name is required";
            if (!formData.email) validationErrors.email = "Email is required";
            else if (!emailRegex.test(formData.email)) {
                validationErrors.email = "Please enter a valid email (e.g., ----@bnmit.in)";
            }
            if (!formData.mentorID) validationErrors.mentorID = "Mentor ID is required";
            else if (!mentorIDRegex.test(formData.mentorID)) {
                validationErrors.mentorID = "Please enter a valid Mentor ID (e.g., BNM0001)";
            }
            if (!formData.password) {
                validationErrors.password = "Password is required";
            } else if (!passwordRegex.test(formData.password)) {
                validationErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
            }
    
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                // Show error toast notification
                toast.error("Please fix the errors in the form.", {
                    autoClose: 3000,
                    position: "top-right"
                });
            } else {
                // Reset errors and form fields before submitting
                setErrors({});
                setFormData({
                    fullName: "",
                    mentorID: "",
                    email: "",
                    password: "",
                });
                // Success toast notification
                toast.success("Registration successful!");
                console.log("Form submitted", formData);
                // You can send the data to your backend here
            }
        };

    return (
        <Grid container sx={{ height: "100vh" }}>
            {/* Left Side (White Background) */}
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
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mb={2}
                        sx={{ fontFamily: "z" }}
                    >
                        Get started today, it's 100% free.
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        mb={4}
                        sx={{ fontFamily: "courier" }}
                    >
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
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


            {/* Right Section */}
            {!isMobile &&
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
                            <Box sx={{ width: { md: "140%", lg: "200%" }, backgroundColor: "#fff", padding: 4, borderRadius: 6, ml: '292px' }}>
                                <Typography variant="h5" fontWeight="bold" mb={2} color="black" fontSize={'40px'} sx={{ fontFamily: "courier" }}>
                                    Welcome to Career Compass!
                                </Typography>
                                <Typography variant="body1" color="text.primary" mb={2} sx={{ fontFamily: "courier" }}>
                                    Thank you for your interest in volunteering as a Compass mentor to help students who are in need to achieve their college and career dreams. The Compass mentoring model is completely virtual: you will conduct all communication through our online platform, without ever having to share your personal contact info with your mentee. The platform also contains all the tools and resources you will need to be successful as a mentor, including mentor training that takes about 30 minutes to complete and can be found in the "help" tab upon registering.
                                </Typography>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            }
        </Grid>

    );
}
