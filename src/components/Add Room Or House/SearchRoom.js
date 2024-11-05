import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../Config-DB/firebase-config';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardContent, Typography, CardActionArea, Box, CardMedia, Button, Skeleton, Alert, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import './SearchRoom.css';

function SearchRoom() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomCollection = collection(firestore, 'Rooms');
      const querySnapshot = await getDocs(roomCollection);
      const roomData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomData);
      setFilteredRooms(roomData);
      setLoading(false);
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(rooms, {
      keys: ['Title', 'Location', 'Type', 'Price'],
      threshold: 0.3
    });

    if (searchTerm) {
      const result = fuse.search(searchTerm);
      const filteredResults = result.map(item => item.item);
      setFilteredRooms(filteredResults);
      setNoResults(filteredResults.length === 0);
    } else {
      setFilteredRooms(rooms);
      setNoResults(false);
    }
  }, [searchTerm, rooms]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Navbar />
      <Typography variant="h3" align="center" sx={{ fontSize: '2.5rem', color: '#333', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2%', marginBottom: '2%' }}>
        Find Your Perfect Accommodation
      </Typography>

      <div className="search-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '400px', borderRadius: '8px', boxShadow: '0 1px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
          InputProps={{
            style: { padding: '1px' },
            endAdornment: (
              <Button onClick={() => setSearchTerm('')} style={{ cursor: 'pointer' }}>
                🔍
              </Button>
            )
          }}
        />
      </div>

      {noResults && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <Alert severity="warning" style={{ width: '40%', textAlign: 'center', marginBottom: '10px' }}>
          No result found
          </Alert>
          
          <Button variant="contained" onClick={() => setSearchTerm('')}>
          Reset search
          </Button>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} sx={{ maxWidth: 345, width: '100%', margin: '10px', borderRadius: '8px', overflow: 'hidden' }}>
              <CardActionArea>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="80%" />
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          filteredRooms.map(room => (
            <Card key={room.id} sx={{ maxWidth: 340, width: '100%', margin: '10px', borderRadius: '8px', overflow: 'hidden' }}>
              <CardActionArea>
                <Slider {...settings} style={{ width: '100%', height: '220px' }}>
                  {room.imageUrls.map((imageUrl, index) => (
                    <div key={index}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={imageUrl}
                        alt={`Room ${index}`}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </Slider>
                <CardContent sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>{room.Title}</Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" style={{ marginRight: '5px', color: '#42B3FF' }} />
                    <Typography variant="subtitle1" gutterBottom>{room.Location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocalOfferIcon fontSize="small" style={{ marginRight: '5px', color: '#42B3FF' }} />
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>{room.Price}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" style={{ color: 'gray' }}>Type: {room.Type}</Typography>
                    <Button component={Link} to={`/room/${room.id}`} variant="outlined">Voir plus</Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchRoom;
