// src/components/Dashboard/Admin.js
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer, AppBar, Toolbar, Typography, IconButton, Box,
  Grid, Paper, List, ListItem, ListItemIcon, ListItemText,
  Button, ListItemSecondaryAction
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Announcement as AnnouncementIcon,
} from '@mui/icons-material';
import Chart from 'react-apexcharts';
import { ThemeContext } from '../../context/ThemeContext';
import AnnouncementList from './AnnouncementList';

const drawerWidth = 240;

const constantUsersByDay = [
  { day: 'Monday', users: 10 },
  { day: 'Tuesday', users: 2 },
  { day: 'Wednesday', users: 12 },
  { day: 'Thursday', users: 6 },
  { day: 'Friday', users: 7 },
  { day: 'Saturday', users: 15 },
  { day: 'Sunday', users: 0 },
];

const constantAnnouncementsByDay = [
  { day: 'Monday', type1: 5, type2: 10 },
  { day: 'Tuesday', type1: 7, type2: 12 },
  { day: 'Wednesday', type1: 6, type2: 9 },
  { day: 'Thursday', type1: 8, type2: 11 },
  { day: 'Friday', type1: 10, type2: 13 },
  { day: 'Saturday', type1: 9, type2: 14 },
  { day: 'Sunday', type1: 11, type2: 15 },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', status: 'active' },
  // Ajoutez plus d'utilisateurs fictifs si nécessaire
];

export default function Admin() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [usersByDay, setUsersByDay] = useState([]);
  const [announcementsByDay, setAnnouncementsByDay] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAnnouncements, setTotalAnnouncements] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsersByDay(constantUsersByDay);
    setTotalUsers(constantUsersByDay.reduce((total, day) => total + day.users, 0));

    setAnnouncementsByDay(constantAnnouncementsByDay);
    setTotalAnnouncements(constantAnnouncementsByDay.reduce((total, day) => total + day.type1 + day.type2, 0));

    // Simuler une récupération d'utilisateurs
    setUsers(mockUsers);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleViewUser = (userId) => {
    // Logic to view user details
    console.log(`Viewing user with ID: ${userId}`);
  };

  const handleBlockUser = (userId) => {
    // Logic to block user
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'blocked' } : user));
  };

  const handleDeleteUser = (userId) => {
    // Logic to delete user
    setUsers(users.filter(user => user.id !== userId));
  };

  const renderUserChart = () => {
    const options = {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: usersByDay.map(data => data.day),
      },
    };

    const series = [
      {
        name: 'Users',
        data: usersByDay.map(data => data.users),
      },
    ];

    return <Chart options={options} series={series} type="bar" height={300} />;
  };

  const renderAnnouncementChart = () => {
    const options = {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: announcementsByDay.map(data => data.day),
      },
    };

    const series = [
      {
        name: 'Type 1',
        data: announcementsByDay.map(data => data.type1),
      },
      {
        name: 'Type 2',
        data: announcementsByDay.map(data => data.type2),
      },
    ];

    return <Chart options={options} series={series} type="bar" height={300} />;
  };

  const renderUserList = () => (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Registered Users
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} secondary={user.email} />
              <ListItemSecondaryAction>
                <Button variant="contained" color="primary" onClick={() => handleViewUser(user.id)}>
                  Consulter
                </Button>
                <Button variant="contained" color="warning" onClick={() => handleBlockUser(user.id)} sx={{ ml: 1 }}>
                  {user.status === 'blocked' ? 'Débloquer' : 'Bloquer'}
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteUser(user.id)} sx={{ ml: 1 }}>
                  Supprimer
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '170vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => setView('dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => setView('users')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={() => setView('announcements')}>
              <ListItemIcon>
                <AnnouncementIcon />
              </ListItemIcon>
              <ListItemText primary="Announcements" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {view === 'dashboard' ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Welcome to the admin dashboard!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Users Statistics
                </Typography>
                <Typography variant="h6">
                  Total Users: {totalUsers}
                </Typography>
                {renderUserChart()}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Announcements Statistics
                </Typography>
                <Typography variant="h6">
                  Total Announcements: {totalAnnouncements}
                </Typography>
                {renderAnnouncementChart()}
              </Paper>
            </Grid>
          </Grid>
        ) : view === 'users' ? (
          renderUserList()
        ) : (
          <AnnouncementList />
        )}
      </Box>
    </Box>
  );
}

Admin.propTypes = {
  constantUsersByDay: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      users: PropTypes.number.isRequired,
    })
  ),
  constantAnnouncementsByDay: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      type1: PropTypes.number.isRequired,
      type2: PropTypes.number.isRequired,
    })
  ),
};
