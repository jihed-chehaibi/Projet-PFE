import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HomeIcon from '@mui/icons-material/Home';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from '../../Config-DB/firebase-config'; 
import logo from '../../assets/logo 2.png';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = '/auth';
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const drawerElement = document.querySelector('.MuiDrawer-paper');
        if (drawerElement) {
            if (isSidebarOpen) {
                drawerElement.classList.add('open');
            } else {
                drawerElement.classList.remove('open');
            }
        }
    }, [isSidebarOpen]);

    return (
        <div className="Navbar">
            <MenuIcon
                onClick={toggleSidebar}
                style={{ color: "white", cursor: "pointer", marginLeft: "10px", fontSize: "35px" }}
            />
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                classes={{ paper: 'MuiDrawer-paper' }}
            >
                <Box
                    role="presentation"
                    className="box-navbar"
                >
                    <img src={logo} alt="logo" className="logo" />
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/WelcomePage">
                                <ListItemIcon>
                                    <HomeIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/Profile">
                                <ListItemIcon>
                                    <AssignmentIndIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/AddRoom">
                                <ListItemIcon>
                                    <HomeWorkIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="Place your Ad" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/AddRoommate">
                                <ListItemIcon>
                                    <PersonAddAlt1Icon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="Add Buddy" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon className="icon" />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default Navbar;
