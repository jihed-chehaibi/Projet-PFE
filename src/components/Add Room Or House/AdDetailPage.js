import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../Config-DB/firebase-config';
import {
  Typography, Grid, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  BottomNavigation, BottomNavigationAction, Box, Paper, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import Navbar from '../NavBar/Navbar';
import './AdDetailPage.css';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationCityIcon from '@mui/icons-material/LocationCity'; // Changed icon
import PriceChangeIcon from '@mui/icons-material/PriceChange'; // Changed icon
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function AdDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomDoc = await getDoc(doc(firestore, 'Rooms', id));
        if (roomDoc.exists()) {
          setRoom({ id: roomDoc.id, ...roomDoc.data() });
        } else {
          console.log('Room not found');
        }
      } catch (error) {
        console.error('Error fetching room:', error);
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
    window.location.href = `https://wa.me/${room.numero}`;
  };

  const handleShareButtonClick = () => {
    if (navigator.share) {
      navigator.share({
        title: room.Title,
        text: 'Check out this room!',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard');
      }).catch(console.error);
    }
  };

  return (
    <div>
      <Navbar />
      {room ? (
        <Container maxWidth="lg">
          <Box sx={{ bgcolor: '#f5f5f5', boxShadow: 3, borderRadius: 2, p: 3, mt: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', mt: 1, mb: 2 }}>
                  {room.Title}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <BottomNavigation showLabels>
                  <BottomNavigationAction style={{ color: '#1976d2', backgroundColor: '#f5f5f5' }} label="Return" icon={<AssignmentReturnIcon sx={{ fontSize: 24 }} />} onClick={() => window.history.back()} />
                </BottomNavigation>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
              <Grid item xs={12} md={8}>
                <ImageGallery
                  items={room.imageUrls.map(url => ({ original: url, thumbnail: url }))}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  additionalClass="first-image"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4%' }}>
              <Button variant="contained" color="primary" sx={{ marginTop: '1%' }} onClick={handleOpenDialog}>Show all images</Button>
              <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
                <DialogTitle>All Images</DialogTitle>
                <DialogContent>
                  <ImageGallery
                    items={room.imageUrls.map(url => ({ original: url, thumbnail: url }))}
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
                    <HomeIcon sx={{ mr: 1 }} /> Information about the room
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationCityIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Location: ${room.Location}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PriceChangeIcon />
                      </ListItemIcon>
                      <ListItemText primary={`Price: ${room.Price}`} />
                    </ListItem>
                    
                  </List>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: 1, justifyContent: 'start' }}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    onClick={handleWhatsAppButtonClick}
                    sx={{
                      minWidth: '40px',
                      width: 'fit-content',
                      background: 'linear-gradient(45deg, #00E676 30%, #00C853 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00C853 30%, #00E676 90%)',
                      },
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    WhatsApp
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<ShareIcon />}
                    onClick={handleShareButtonClick}
                    sx={{
                      minWidth: '40px',
                      width: 'fit-content',
                      background: '#1976d2',
                      color: 'white',
                      '&:hover': {
                        background: '#115293',
                      },
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Share
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      ) : (
        <Typography variant="body1">Advertisement not found</Typography>
      )}
    </div>
  );
}

export default AdDetailPage;
