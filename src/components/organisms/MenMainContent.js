import React from "react";
import { Box, Typography, Divider, Card, CardContent, CardMedia, Grid } from "@mui/material";

export default function MentorTrainingPage() {
    // Array of card content
    const trainingModules = [
        {
            title: "Student 1",
            description: "Here are some things to get your mentorship started off on the right track.",
            image: "https://via.placeholder.com/150", // Replace with actual image URL
        },
        {
            title: "Student 2",
            description: "Here are some thoughtful approaches to mentoring with diversity and inclusion in mind.",
            image: "https://via.placeholder.com/150", // Replace with actual image URL
        },
        {
            title: "Student 3",
            description: "To foster the best environment and relationship between you and your student, Career Compass has a list of sample scenarios you might encounter.",
            image: "https://via.placeholder.com/150", // Replace with actual image URL
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", sm: "80%", md: "70%", lg: "100%" },
                    height: '50%',
                }}
            >
                {/* Heading */}
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, mt: 4, fontFamily: 'Courier', textAlign: "center" }}>
                    Mentor Training
                </Typography>

                {/* Subheading */}
                <Box sx = {{width: '100%'}}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontFamily: 'Gilroy', textAlign: "center" }}>
                    The below optional training modules provide additional information about what is expected of you as
                    a mentor and what you can expect from Career Compass; the tools and resources available to you as a Career Compass
                    mentor; and other helpful information to make your mentoring experience a success!
                </Typography>
                </Box>

                {/* Divider */}
                <Divider sx={{ mb: 3 }} />

                {/* Cards Section */}
                <Grid container spacing={4} justifyContent={'center'} alignItems={'stretch'}>
                    {trainingModules.map((module, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: 3,
                                    borderRadius: 2,
                                }}
                            >
                                {/* Image */}
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={module.image}
                                    alt={module.title}
                                />
                                {/* Content */}
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{ textAlign: "center", fontSize: 16, fontFamily:"courier" }}
                                    >
                                        {module.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "justify", fontSize: 14, fontFamily: 'gilroy' }}>
                                        {module.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
