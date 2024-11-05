import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../Config-DB/firebase-config';
import {
  Typography, Grid, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  BottomNavigation, BottomNavigationAction, Menu, MenuItem, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import Navbar from '../NavBar/Navbar';
import './BuddyDetailAd.css';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import ContactsIcon from '@mui/icons-material/Contacts';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import InfoIcon from '@mui/icons-material/Info';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function BuddyDetailAd() {
  const { id } = useParams();
  const [buddy, setBuddy] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomDoc = await getDoc(doc(firestore, 'Buddy', id));
        if (roomDoc.exists()) {
          setBuddy({ id: roomDoc.id, ...roomDoc.data() });
        } else {
          console.log('Buddy Ad not found');
        }
      } catch (error) {
        console.error('Error fetching Buddy Ad:', error);
      }
    };
    fetchRoom();
  }, [id]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleWhatsAppButtonClick = () => {
    window.location.href = `https://wa.me/${buddy.Phone}`;
  };

  const handleMailButtonClick = () => {
    window.location.href = `mailto:?to=${buddy.Email}&subject=&body=`;
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleImageClick = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const handleZoomDialogClose = () => {
    setZoomedImage(null);
  };

  return (
    <div>
      <Navbar />
      {buddy ? (
        <Container maxWidth="lg">
          <Box sx={{ 
            bgcolor: '#f5f5f5', 
            boxShadow: 3, 
            borderRadius: 2, 
            p: 3, 
            mt: 3,
            mb: 3
          }}>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', mt: 1, mb: 2 }}>
                  {buddy.Title}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BottomNavigation showLabels>
                  <BottomNavigationAction style={{ color: '#1976d2', backgroundColor: '#f5f5f5' }} label="Return" icon={<AssignmentReturnIcon sx={{ fontSize: 30 }} />} onClick={() => window.history.back()} />
                </BottomNavigation>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
              <Grid item xs={12} md={8}>
                <ImageGallery
                  items={buddy.imageUrls.map(url => ({ original: url, thumbnail: url }))}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  onClick={handleImageClick}
                  additionalClass="first-image"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4%' }}>
              <Button variant="contained" color="primary" onClick={handleOpenDialog}>Show all images</Button>
              <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" >
                <DialogTitle>All Images</DialogTitle>
                <DialogContent >
                  <ImageGallery
                    items={buddy.imageUrls.map(url => ({ original: url, thumbnail: url }))}
                    showPlayButton={false}
                    showFullscreenButton={true}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary" variant="contained">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Paper elevation={3} sx={{ padding: '2%', marginBottom: '3%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>
                    <HomeIcon sx={{ mr: 1 }} /> Information about flat-sharing
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Address: ${buddy.Address}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`City: ${buddy.City}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Postal Code: ${buddy.PostalCode}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Country: ${buddy.Country}`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1 }} /> Housing Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Type of accommodation: ${buddy.Type_of_Accommodation}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Rooms available: ${buddy.rooms_available}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Monthly rent: ${buddy.Monthly_Rent}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MonetizationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Monthly charges: ${buddy.Monthly_Charges}`} />
                    </ListItem>
                  </List>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1 }} /> Roommate Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Minimum Age of Desired Roommates: ${buddy.Minimum_Age_of_Desired_Roommates}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Gender of Desired Roommates: ${buddy.Gender_of_Desired_Roommates}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Language: ${buddy.Language}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Preferences in Terms of Behavior: ${buddy.Preferences_in_Terms_of_Behavior}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Hobbies: ${buddy.Hobbies}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Occupation: ${buddy.Occupation}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Other Details: ${buddy.Other_Details}`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button variant="contained" color="inherit" startIcon={<ContactsIcon />} onClick={handleMenuOpen} sx={{ width: '100%' }}>
                    Contact
                  </Button>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleWhatsAppButtonClick}>
                      <WhatsAppIcon />
                      WhatsApp
                    </MenuItem>
                    <MenuItem onClick={handleMailButtonClick}>
                      <MailIcon />
                      Email
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      ) : (
        <Typography variant="body1">Advertisement not found</Typography>
      )}
      <Dialog open={Boolean(zoomedImage)} onClose={handleZoomDialogClose} maxWidth="lg">
        <DialogContent>
          <img src={zoomedImage} alt="Zoomed" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleZoomDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BuddyDetailAd;
