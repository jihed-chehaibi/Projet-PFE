// src/components/AddRoom/AddRoom.js

import React, { useState } from 'react';
import { Container, TextField, Button, Grid, IconButton, Typography, Alert, InputLabel, MenuItem, FormControl, Select, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Navbar from '../NavBar/Navbar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './AddRoom.css';
import useHandleClick from './helpers';
import { auth } from '../../Config-DB/firebase-config';

function AddRoom() {
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    Title: '',
    numero: '',
    Location: '',
    description: '',
    Price: '',
    Type: '',
    currency: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { handleClick } = useHandleClick();

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(prevImages => [...prevImages, ...files]);
    event.target.value = null; // Resetting the file input after selection
    console.log(files);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await handleClick(formData, selectedImages, userId, setShowAlert, setShowSuccessAlert, setFormData, setSelectedImages, setMessage);
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" className="center-container">
        {showAlert && <Alert severity="warning" onClose={() => setShowAlert(false)}>{message}</Alert>}
        {showSuccessAlert && <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>Room added successfully!</Alert>}
        <Typography variant="h5" align="center" style={{ marginBottom: '4%' , color: 'rgb(0, 146, 251)', fontWeight: 'bold'}} gutterBottom>
          - Create a New Advertisement -
        </Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="Title" type="text" label="Title" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select name="Type" label="Type" onChange={handleChange}>
                  <MenuItem value="Room">Room</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="Location" type="text" label="Location" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="Price" type="number" label="Price" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select name="currency" label="Currency" onChange={handleChange}>
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="€">€</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <PhoneInput
                  country="be"
                  inputStyle={{ width: '100%', height: '56px' }}
                  onChange={(value) => setFormData({ ...formData, numero: '+' + value })}
                  specialLabel="Phone Number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" type="text" label="Description" variant="outlined" fullWidth multiline rows={4} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {selectedImages.map((image, index) => (
                  <Grid item key={index} xs={4} style={{ position: 'relative' }}>
                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                      style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: '#fff' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" padding={2}>
              <Button type="button" variant="contained" color="inherit" onClick={() => window.location.reload()}>
                Cancel
              </Button>
              <Button sx={{ marginLeft: '10px' }} type="submit" variant="contained" disabled={isLoading} color="primary">
                {isLoading ? <CircularProgress size={12} /> : 'Confirm'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default AddRoom;
