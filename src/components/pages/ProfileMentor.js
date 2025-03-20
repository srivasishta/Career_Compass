import React, { useState, useEffect } from "react";
import { Box, Drawer, Container, Paper, Typography, Avatar, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../organisms/SideBarMentor";
import NavDash from "../organisms/NavMentor";

const MentorProfile = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [title, setTitle] = useState("Mentor Profile");
    const [mentorData, setMentorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // ✅ Fetch Mentor Profile
    const fetchMentorProfile = async () => {
        const mentorID = localStorage.getItem("mentorID"); // Make sure 'mentorID' is stored during login
        if (!mentorID) {
            setError("Mentor ID not found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5002/api/mentors/BNM0001`);
            console.log(response.data);
            setMentorData(response.data);
        } catch (error) {
            console.error("Error fetching mentor profile:", error);
            setError("Could not fetch profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentorProfile();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (path) => {
        setTitle(path);
        navigate(`/${path}`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !mentorData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="error">{error || "Mentor profile not found!"}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <NavDash onDrawerToggle={handleDrawerToggle} title={title} />

            <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
                <Box sx={{ width: 250, backgroundColor: "#FBFBFB", boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)", display: { xs: "none", sm: "block" } }}>
                    <SideBar onMenuClick={handleMenuClick} />
                </Box>

                <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
                    <Container maxWidth="md">
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                                    {mentorData.name ? mentorData.name.charAt(0).toUpperCase() : "?"}
                                </Avatar>
                                <Typography variant="h5" fontWeight="bold">
                                    {mentorData.name || "N/A"}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {mentorData.employeeId || "N/A"} - {mentorData.expertise?.join(", ") || "N/A"}
                                </Typography>
                            </Box>

                            <Grid container spacing={3} sx={{ mt: 3 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Mentor ID:</strong> {mentorData.ID || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>Email:</strong> {mentorData.email || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>College Email:</strong> {mentorData.collegeEmail || "N/A"}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="body1"><strong>Mobile:</strong> {mentorData.mobileNumber || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>Alt Mobile:</strong> {mentorData.alternateMobileNumber || "N/A"}</Typography>
                                    <Typography variant="body1"><strong>Gender:</strong> {mentorData.gender || "N/A"}</Typography>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Typography variant="h6">About Me</Typography>
                                <Typography variant="body1" sx={{ mt: 1, fontStyle: "italic" }}>
                                    {mentorData.shortBio || "No bio available"}
                                </Typography>
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </Box>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: "block", sm: "none" }, color: "black" }}
            >
                <SideBar onMenuClick={handleMenuClick} />
            </Drawer>
        </Box>
    );
};

export default MentorProfile;
