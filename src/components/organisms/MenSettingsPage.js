import React, { useState } from "react";
import {
    Box,
    Typography,
    Divider,
    Button,
    TextField,
    Stepper,
    Step,
    StepLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = ["User Details", "Academics", "Profile Details"];
const mentorIDRegex = /^BNM\d{4}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@bnmit\.in$/;

const MenSettingsPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        mentorID: "",
        mobileNumber: "",
        alternateMobileNumber: "",
        collegeEmail: "",
        gender: "",
        dob: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
        // Clear the error as soon as the field is corrected
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: ""
        }));
    };


    const validateStep = () => {
        const errors = {};

        if (!formData.name) errors.name = "Name is required.";
        if (!formData.mentorID) errors.mentorID = "Mentor ID is required";
        else if (!mentorIDRegex.test(formData.mentorID)) {
            errors.mentorID = "Please enter a valid Mentor ID (e.g., BNM0001)";
        }

        if (!formData.mobileNumber) {
            errors.mobileNumber = "Mobile Number is required.";
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            errors.mobileNumber = "Enter a valid 10-digit Mobile Number.";
        }

        if (!formData.collegeEmail) {
            errors.collegeEmail = "Email is required";
        } else if (!emailRegex.test(formData.collegeEmail)) {
            errors.collegeEmail = "Please enter a valid email (e.g., example@bnmit.in)";
        }

        if (!formData.gender) errors.gender = "Gender is required.";

        setFormErrors(errors);

        // Return true only if no errors exist
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prev) => prev + 1);
        } else {
            setTimeout(() => {
                toast.warn("Please correct the errors before proceeding.");
            }, 200); // Delay warning toast slightly to ensure state updates
        }
    };    

    const handleReset = () => {
        setActiveStep(0);
        setFormData({
            name: "",
            mentorID: "",
            mobileNumber: "",
            alternateMobileNumber: "",
            email: "",
            collegeEmail: "",
            gender: "",
        });
        setFormErrors({});
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "24px",
            }}
        >
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ width: "60%", mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step Content */}
            <Box
                sx={{
                    backgroundColor: "#fff",
                    width: "60%",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    padding: "24px",
                }}
            >
                {activeStep === 0 && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                            User Details
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    error={!!formErrors.name}
                                    helperText={formErrors.name}
                                />
                                <TextField
                                    label="Mentor ID"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.mentorID.toUpperCase()} // Ensure input is displayed in uppercase
                                    onChange={(e) => {
                                        const uppercasedValue = e.target.value.toUpperCase();
                                        handleInputChange("mentorID", uppercasedValue);
                                    }}
                                    error={!!formErrors.mentorID}
                                    helperText={formErrors.mentorID}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Mobile Number"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.mobileNumber}
                                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                                    error={!!formErrors.mobileNumber}
                                    helperText={formErrors.mobileNumber}
                                />
                                <TextField
                                    label="Alternate Mobile Number"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.alternateMobileNumber}
                                    onChange={(e) =>
                                        handleInputChange("alternateMobileNumber", e.target.value)
                                    }
                                />
                            </Box>
                            <TextField
                                label="College Email ID"
                                variant="outlined"
                                fullWidth
                                value={formData.collegeEmail}
                                onChange={(e) => handleInputChange("collegeEmail", e.target.value)}
                                error={!!formErrors.collegeEmail}
                                helperText={formErrors.collegeEmail}
                            />
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender-select"
                                        value={formData.gender}
                                        onChange={(e) => handleInputChange("gender", e.target.value)}
                                        error={!!formErrors.gender}
                                    >
                                        <MenuItem value="">Select Gender</MenuItem> {/* Default empty option */}
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                    {formErrors.gender && (
                                        <Typography color="error" variant="caption">
                                            {formErrors.gender}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>
                        </Box>
                    </>
                )}

                {activeStep === 1 && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontFamily: "Courier" }}>
                            Academics
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        {/* Graduation Year */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography fontFamily="Courier">What is your graduation year?</Typography>
                            <TextField
                                id="year"
                                select
                                defaultValue="2025"
                                SelectProps={{
                                    native: true,
                                }}
                                variant="standard"
                            >
                                {[2023, 2024, 2025, 2026].map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </TextField>
                        </FormControl>

                        {/* College */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography fontFamily="Courier">Employee in...</Typography>
                            <TextField multiline placeholder="Enter your college name" />
                        </FormControl>

                        {/* Majors */}
                        <FormControl fullWidth>
                            <Typography id="majors-label" fontFamily="Courier">
                                Choose your major
                            </Typography>
                            <TextField multiline placeholder="Enter your Majors..." />
                        </FormControl>
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontFamily: "Courier" }}>
                            Profile Details
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="body1" sx={{ mb: 1, fontFamily: "Courier" }}>
                            Short Bio
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="How would I like to contribute..."
                            multiline
                            variant="outlined"
                            sx={{ mb: 3 }}
                        />
                    </>
                )}
            </Box>

            <Box>
                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 3 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((prev) => prev - 1)}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {activeStep < steps.length - 1 ? (
                        <Button onClick={handleNext} variant="contained">
                            Next
                        </Button>
                    ) : (
                        <>
                            <Button onClick={handleReset} variant="contained" color="secondary" startIcon={<RestartAltIcon />} sx={{ mr: 2 }}>
                                Reset
                            </Button>
                            <Button
                                onClick={() => toast.success("Form submitted successfully!")}
                                variant="contained"
                                color="primary"
                                endIcon={<CheckCircleIcon />}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default MenSettingsPage;
