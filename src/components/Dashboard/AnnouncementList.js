// src/components/Dashboard/AnnouncementList.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';

const mockAnnouncements = [
  { id: 1, title: 'Announcement 1', },
  { id: 2, title: 'Announcement 2',  },
  { id: 3, title: 'Announcement 3',  },
  { id: 3, title: 'Announcement 4', },
  { id: 3, title: 'Announcement 5',},
  { id: 3, title: 'Announcement 6',  },
  { id: 3, title: 'Announcement 7',  },
  { id: 3, title: 'Announcement 8',  },
  { id: 3, title: 'Announcement 9',  },
  { id: 3, title: 'Announcement 10',  },
  { id: 3, title: 'Announcement 11', },
  { id: 3, title: 'Announcement 12', },
  { id: 3, title: 'Announcement 13',  },
 
];

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Remplacez par votre logique de récupération des annonces
    setAnnouncements(mockAnnouncements);
  }, []);

  const handleViewAnnouncement = (announcementId) => {
    // Logic to view announcement details
    console.log(`Viewing announcement with ID: ${announcementId}`);
  };

  const handleDeleteAnnouncement = (announcementId) => {
    // Logic to delete announcement
    setAnnouncements(announcements.filter(announcement => announcement.id !== announcementId));
  };

  return (
    <Box sx={{ p: 3 , }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          All Announcements
        </Typography>
        <List>
          {announcements.map((announcement) => (
            <ListItem key={announcement.id}>
              <ListItemText primary={announcement.title} secondary={announcement.description} />
              <ListItemSecondaryAction>
                <Button variant="contained" color="primary" onClick={() => handleViewAnnouncement(announcement.id)}>
                  Consulter
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteAnnouncement(announcement.id)} sx={{ ml: 1 }}>
                  Supprimer
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AnnouncementList;
