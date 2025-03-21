import React from "react";
import { Card, Typography, Divider, Button, Box } from "@mui/material";

const MentorCard = ({ mentor }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",  // Ensure the card takes up full height within its container
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      {/* Top part with user photo and name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "#FBD288",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Typography variant="h6" color="white" fontWeight="bold">
          {mentor.name}
        </Typography>
      </Box>

      {/* Specialization and Divider */}
      <Box sx={{ padding: "15px" }}>
        <Typography variant="body2" fontStyle="italic" color="textSecondary">
          {mentor.specialization}
        </Typography>
      </Box>

      <Divider sx={{ margin: "5px 20px" }} />

      {/* Bio Section */}
      <Box sx={{ padding: "15px", flexGrow: 1 }}>
        <Typography variant="body2" color="textSecondary">
          {mentor.bio}
        </Typography>
      </Box>

      <Divider sx={{ margin: "5px 20px" }} />

      {/* Help With Section */}
      <Box sx={{ padding: "15px" }}>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "30px" }}>
          Can Help With: {mentor.helpWith}
        </Typography>
        <Button
          fullWidth
          sx={{
            backgroundColor : '#C4D9FF',
            color: "black",  
            '&:hover': {
              backgroundColor: "#6A80B9",
              color: "white"
            },
          }}
        >
          Choose as Mentor
        </Button>
      </Box>
    </Card>
  );
};

export default MentorCard;
