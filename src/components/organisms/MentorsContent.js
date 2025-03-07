import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import mentorsData from "../../data/Mentor.json"
import MentorCard from "../molecules/Cards";

const MentorPage = () => {
  const [search, setSearch] = useState("");

  // Filter mentors based on the search input
  const filteredMentors = mentorsData.filter((mentor) =>
    mentor.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Static Section */}
      <Box sx={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1, padding: "20px 0" }}>
        <Typography variant="h4" component="h1" textAlign="center" fontFamily="Courier">
          Find Mentor
        </Typography>
        <Typography variant="body1" fontFamily="Bookman Old Style" textAlign="center" sx={{ marginBottom: "20px" }}>
          All of these mentors are ready to help! Select a mentor that you'd like to work with.
        </Typography>

        {/* Search Box */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <TextField
            label="Search for Mentors..."
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: "100%", maxWidth: "600px" }}
          />
        </Box>
      </Box>

      <Divider sx={{ marginBottom: "30px" }} />

      {/* Mentor Cards Section */}
      <Box
        sx={{
          maxHeight: "calc(100vh - 250px)",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none", // Hides the scrollbar in Webkit browsers (Chrome, Safari)
          },
          scrollbarWidth: "none", // Hides scrollbar in Firefox
        }}
      >
        <Grid container spacing={3} justifyContent="center" mb={'40px'}>
          {filteredMentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={4} key={mentor.id}>
              <MentorCard mentor={mentor} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MentorPage;
