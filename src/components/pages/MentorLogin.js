import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const mentorIDRegex = /^BNM\d{4}$/;

export default function MentorSignInPage() {
    const [mentorID, setMentorID] = useState("");
    const [password, setPassword] = useState("");
    const [mentorIDError, setMentorIDError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error messages

    const mentorIDRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate(); // Use navigate

    useEffect(() => {
        if (mentorIDRef.current) {
            mentorIDRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMentorIDError("");
        setPasswordError("");
        setErrorMessage("");

        if (!mentorID) {
            setMentorIDError("Mentor ID is required.");
            mentorIDRef.current.focus();
            return;
        } else if (!mentorIDRegex.test(mentorID)) {
            setMentorIDError("Please enter a valid Mentor ID (e.g., BNM0001).");
            mentorIDRef.current.focus();
            return;
        }

        if (!password) {
            setPasswordError("Password is required.");
            passwordRef.current.focus();
            return;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            passwordRef.current.focus();
            return;
        }

        try {
            console.log("Sending request with:", { mentorID, password });  // Log request payload
        
            const response = await axios.post("http://localhost:5002/api/mentor/login", { mentorID, password });
        
            console.log("Response received:", response.data);  // Log response from server
        
            if (response.data.success) {
                localStorage.setItem("mentorToken", response.data.token);
                navigate("/Dashboard-mentor");
            } else {
                setErrorMessage("Invalid Mentor ID or Password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error);
            setErrorMessage("Login failed. Check your credentials.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to bottom, #f5f5f5 50%, #000 50%)",
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", sm: "80%", md: "50%", lg: "40%" },
                    maxWidth: 450,
                    backgroundColor: "#F8FAFC",
                    borderRadius: 3,
                    boxShadow: 3,
                    padding: { xs: 3, sm: 4, md: 5 },
                }}
            >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            mb: 2,
                        }}
                    >
                        <AcUnitIcon sx={{ fontSize: 40, color: "black.main" }} />
                        <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Courier" }}>
                            Career Compass
                        </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        Account Login
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Enter your account info below:
                    </Typography>
                </Box>

                {errorMessage && (
                    <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
                        {errorMessage}
                    </Typography>
                )}

                <Box
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: 1,
                        padding: { xs: 2, sm: 4 },
                        mb: 3,
                    }}
                >
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Mentor ID"
                            placeholder="BNM0001"
                            value={mentorID}
                            onChange={(e) => setMentorID(e.target.value)}
                            error={Boolean(mentorIDError)}
                            helperText={mentorIDError}
                            sx={{ mb: 2 }}
                            inputRef={mentorIDRef}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            sx={{ mt: 1 }}
                            inputRef={passwordRef}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ textTransform: "capitalize", mb: 2, py: 1, background: "#FFA928" }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            <Link href="/mentor/register" underline="hover" color="primary">
                                Create Mentor Account
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}