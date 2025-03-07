// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PropTypes from "prop-types";

// const NavMentor = ({ onDrawerToggle, title }) => {
//     const [anchorEl, setAnchorEl] = useState(null);

//     const handleAvatarClick = (event) => {
//         setAnchorEl(event.currentTarget); // Set the anchor element for the menu
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null); // Close the menu
//     };

//     return (
//         <AppBar
//             position="static"
//             sx={{
//                 backgroundColor: "#FBF5E5",
//                 boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             }}
//         >
//             <Toolbar
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                 }}
//             >
//                 <IconButton
//                     color="inherit"
//                     aria-label="open drawer"
//                     edge="start"
//                     onClick={onDrawerToggle}
//                     sx={{
//                         display: { sm: "none" },
//                         color: "black", // Ensure MenuIcon is black
//                     }}
//                 >
//                     <MenuIcon />
//                 </IconButton>

//                 <Typography
//                     variant="h6"
//                     sx={{
//                         color: "black",
//                         fontFamily: "Courier",
//                         fontWeight: "bold",
//                         cursor: "pointer",
//                         fontSize: 38,
//                     }}
//                 >
//                     {title}
//                 </Typography>

//                 <Box>
//                     <Avatar
//                         sx={{ cursor: "pointer" }}
//                         onClick={handleAvatarClick} // Open dropdown menu on click
//                     >
//                         S
//                     </Avatar>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)} // Open if anchorEl is not null
//                         onClose={handleMenuClose}
//                     >
//                         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//                         <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
//                         <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//                     </Menu>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

// NavMentor.propTypes = {
//     onDrawerToggle: PropTypes.func.isRequired,
//     title: PropTypes.string.isRequired,
// };

// export default NavMentor;

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const NavMentor = ({ onDrawerToggle, title }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate(); // To navigate programmatically

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleTitleClick = () => {
        navigate("/"); // Navigate to home when title is clicked
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#FBF5E5",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onDrawerToggle}
                    sx={{
                        display: { sm: "none" },
                        color: "black", // Ensure MenuIcon is black
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        color: "black",
                        fontFamily: "Courier",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: 38,
                    }}
                    onClick={handleTitleClick} // Make title clickable
                >
                    {title}
                </Typography>

                <Box>
                    <Avatar
                        sx={{ cursor: "pointer" }}
                        onClick={handleAvatarClick} // Open dropdown menu on click
                    >
                        S
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)} // Open if anchorEl is not null
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

NavMentor.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default NavMentor;
