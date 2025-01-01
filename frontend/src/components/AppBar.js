// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';

// const pages = [
//     { name: 'Book NOW', link: '/room-Type' },
//     { name: 'Facilities', link: '/facilities' },
//     { name: 'Contact Us', link: '/about-us' },
// ];

// const settings = [
//     { name: 'Profile', link: '/profile' },
//     { name: 'Sign In', link: '/signinPage' },
//     { name: 'Bookings', link: '/bookings' },
//     { name: 'Logout', link: '/logout' },
// ];

// function ResponsiveAppBar() {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);
//     const navigate = useNavigate();

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };

//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     const handleLogout = async () => {
//         try {
//             // Clear frontend session data
//             localStorage.removeItem("userId");  // Clear user ID from localStorage
//             localStorage.removeItem("authToken");  // If you use an auth token, clear it too

//             // Call backend API to logout if needed (e.g., clear session on the server)
//             const response = await fetch("http://localhost:5000/api/logout", { method: "POST" });

//             if (response.ok) {
//                 // After successful logout, navigate to sign-in page
//                 navigate("/signinPage");
//             } else {
//                 alert("Logout failed. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error during logout:", error);
//             alert("Error logging out. Please try again.");
//         }
//     };

//     return (
//         <AppBar position="static" sx={{ backgroundColor: 'black' }}>
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
//                         <img
//                             src="/logoBlack.png"
//                             alt="E-JUST Logo"
//                             style={{ padding: '20px 50px', width: '400px', height: '80px', marginRight: '40px' }}
//                         />
//                         <Typography
//                             variant="h6"
//                             noWrap
//                             component="a"
//                             href="#"
//                             sx={{
//                                 fontFamily: 'monospace',
//                                 fontWeight: 700,
//                                 color: 'white',
//                                 textDecoration: 'none',
//                             }}
//                         >
//                             E-JUST Accommodations
//                         </Typography>
//                     </Box>

//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton
//                             size="large"
//                             aria-label="open navigation menu"
//                             aria-controls="menu-appbar"
//                             aria-haspopup="true"
//                             onClick={handleOpenNavMenu}
//                             color="inherit"
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu
//                             id="menu-appbar"
//                             anchorEl={anchorElNav}
//                             anchorOrigin={{
//                                 vertical: 'bottom',
//                                 horizontal: 'left',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'left',
//                             }}
//                             open={Boolean(anchorElNav)}
//                             onClose={handleCloseNavMenu}
//                         >
//                             {pages.map((page) => (
//                                 <MenuItem key={page.name} onClick={handleCloseNavMenu}>
//                                     <Typography textAlign="center">
//                                         <Link to={page.link} style={{ textDecoration: 'none', color: 'grey' }}>
//                                             {page.name}
//                                         </Link>
//                                     </Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>

//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                         {pages.map((page) => (
//                             <Button
//                                 key={page.name}
//                                 component={Link}
//                                 to={page.link}
//                                 sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
//                             >
//                                 {page.name}
//                             </Button>
//                         ))}
//                     </Box>

//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="Open settings">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//                             </IconButton>
//                         </Tooltip>
//                         <Menu
//                             sx={{ mt: '45px' }}
//                             id="menu-appbar"
//                             anchorEl={anchorElUser}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             keepMounted
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right',
//                             }}
//                             open={Boolean(anchorElUser)}
//                             onClose={handleCloseUserMenu}
//                         >
//                             {settings.map((setting) => (
//                                 <MenuItem
//                                     key={setting.name}
//                                     onClick={setting.name === 'Logout' ? handleLogout : handleCloseUserMenu}
//                                 >
//                                     <Typography textAlign="center">
//                                         {setting.name === 'Logout' ? (
//                                             <span style={{ cursor: 'pointer' }}>Logout</span>
//                                         ) : (
//                                             <Link to={setting.link} style={{ textDecoration: 'none', color: 'grey' }}>
//                                                 {setting.name}
//                                             </Link>
//                                         )}
//                                     </Typography>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// }

// export default ResponsiveAppBar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = [
    { name: 'Book NOW', link: '/room-Type' },
    { name: 'Facilities', link: '/facilities' },
    { name: 'Contact Us', link: '/about-us' },
];

const settings = [
    { name: 'Profile', link: '/profile' },
    { name: 'Sign In', link: '/signinPage' },
    { name: 'Bookings', link: '/bookings' },
    { name: 'Logout', link: '/signinPage' }, // Will handle logout functionality
];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleLogout = () => {
        // Logic to clear user session (e.g., localStorage.clear())
        localStorage.removeItem('userId');
        localStorage.removeItem('userLoggedIn');
        navigate('/signinPage'); // Redirect to the signin page after logout
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <img
                            src="/logoBlack.png"
                            alt="E-JUST Logo"
                            style={{
                                padding: '20px 50px',
                                width: '400px',
                                height: '80px',
                                marginRight: '40px',
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            E-JUST Accommodations
                        </Typography>
                    </Box>

                    {/* Mobile Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page.link} style={{ textDecoration: 'none', color: 'grey' }}>
                                            {page.name}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.link}
                                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={setting.name === 'Logout' ? handleLogout : handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        <Link
                                            to={setting.link}
                                            style={{ textDecoration: 'none', color: 'grey' }}
                                        >
                                            {setting.name}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ResponsiveAppBar;
