import React, { useState, useEffect } from 'react';
import Navbar from '../NavBar/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../Config-DB/firebase-config';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Fuse from 'fuse.js';
import { Card, CardContent, Typography, CardActionArea, Box, CardMedia, Button, Skeleton, Alert, CircularProgress, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function FindRoommate() {
  const [buddy, setBuddy] = useState([]);
  const [filteredBuddy, setFilteredBuddy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchBuddy = async () => {
      setLoading(true);
      const BuddyCollection = collection(firestore, 'Buddy');
      const querySnapshot = await getDocs(BuddyCollection);
      const BuddyData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBuddy(BuddyData);
      setFilteredBuddy(BuddyData);
      setLoading(false);
    };

    fetchBuddy();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const fuseOptions = {
    keys: ['Title', 'Address', 'Gender_of_Desired_Roommates', 'Country', 'Occupation'],
    threshold: 0.3
  };

  const handleSearch = () => {
    setSearching(true);
    if (searchTerm.trim() !== '') {
      const fuse = new Fuse(buddy, fuseOptions);
      const result = fuse.search(searchTerm);
      const filteredResults = result.map(({ item }) => item);
      setFilteredBuddy(filteredResults);
      setNoResults(filteredResults.length === 0);
    } else {
      setFilteredBuddy(buddy);
      setNoResults(false);
    }
    setSearching(false);
  };

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
      <Box display="flex" alignItems="center" justifyContent="center" marginBottom="20px">
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '400px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searching && <CircularProgress size={24} />}
              </InputAdornment>
            )
          }}
        />
      </Box>

      {noResults && (
        <Box display="flex" justifyContent="center" marginBottom="20px">
          <Alert severity="warning" style={{ width: '50%', textAlign: 'center' }}>
            No results found
          </Alert>
        </Box>
      )}

      <Box display="flex" flexWrap="wrap" justifyContent="center">
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
          filteredBuddy.map(Buddy => (
            <Card key={Buddy.id} sx={{ maxWidth: 345, width: '100%', margin: '10px', borderRadius: '8px', overflow: 'hidden' }}>
              <CardActionArea>
                <Slider {...settings}>
                  {Buddy.imageUrls.map((imageUrl, index) => (
                    <div key={index}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={imageUrl}
                        alt={`Image ${index}`}
                        sx={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </Slider>
                <CardContent sx={{ marginTop: '5%' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{Buddy.Title}</Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">Country: {Buddy.Country}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">Address: {Buddy.Address}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">Gender: {Buddy.Gender_of_Desired_Roommates}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="subtitle1">Occupation: {Buddy.Occupation}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" mb={1}>
                    <Button component={Link} to={`/buddy/${Buddy.id}`} variant="contained" color="primary">See more</Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
}

export default FindRoommate;
