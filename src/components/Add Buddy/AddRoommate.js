import * as React from 'react';
import Navbar from '../NavBar/Navbar';
import './AddRoommate.css';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { TextField, Typography, Box, IconButton, Button, Alert, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneInput from 'react-phone-input-2';
import { useState } from 'react';
import useHandleClick from './HelpersAddRommate';
import backgroundImage from '../../assets/Add2.gif';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { auth } from '../../Config-DB/firebase-config';

function AddRoommate() {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        Title: '',
        Address: '',
        City: '',
        PostalCode: '',
        Country: '',
        Type_of_Accommodation: '',
        rooms_available: '',
        Monthly_Rent: '',
        Monthly_Charges: '',
        Minimum_Age_of_Desired_Roommates: '',
        Gender_of_Desired_Roommates: '',
        Language: '',
        Preferences_in_Terms_of_Behavior: '',
        Hobbies: '',
        Occupation: '',
        Other_Details: '',
        Full_Name: '',
        Email: '',
        Phone: '',
        imageUrls: []
    });
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const { handleClick } = useHandleClick();
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

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(prevImages => [...prevImages, ...files]);
        event.target.value = null; // Resetting the file input after selection
    };
    const handleRemoveImage = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Navbar />
            <Container className='container' maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div className="image-container" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {showAlert && <Alert severity="warning" onClose={() => setShowAlert(false)}>{message}</Alert>}
                        {showSuccessAlert && <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>Ad added successfully!</Alert>}
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#077ff8' }}>- ADD BUDDY -</h1>
                                <Grid container spacing={2} sx={{ mt: 5 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">* Information about flat-sharing :</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Title" name="Title" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Address" name="Address" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="City" name="City" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Postal Code" name="PostalCode" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Country" name="Country" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">* Housing Information :</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Type of Accommodation</InputLabel>
                                            <Select label='Type of Accommodation' name="Type_of_Accommodation" onChange={handleChange}>
                                                <MenuItem value={'Apartment'}>Apartment</MenuItem>
                                                <MenuItem value={'House'}>House</MenuItem>
                                                <MenuItem value={'Studio'}>Studio</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Number of rooms available" type='number' name="rooms_available" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Monthly Rent (in euros)" name="Monthly_Rent" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth margin="normal" label="Monthly Charges (in euros)" name="Monthly_Charges" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">* Roommate Information :</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth margin="normal" label="Minimum Age of Desired Roommates" type='number' name="Minimum_Age_of_Desired_Roommates" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Gender of Desired Roommates</InputLabel>
                                            <Select label='Gender of Desired Roommates' name="Gender_of_Desired_Roommates" onChange={handleChange}>
                                                <MenuItem value={'Male'}>Male</MenuItem>
                                                <MenuItem value={'Female'}>Female</MenuItem>
                                                <MenuItem value={'No preference'}>No preference</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Language</InputLabel>
                                            <Select label='Language' name="Language" onChange={handleChange}>
                                                <MenuItem value={'French'}>French</MenuItem>
                                                <MenuItem value={'Dutch'}>Dutch</MenuItem>
                                                <MenuItem value={'English'}>English</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth margin="normal" label="Preferences in Terms of Behavior" name="Preferences_in_Terms_of_Behavior" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth margin="normal" label="Hobbies" name="Hobbies" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Occupation (Work/Study):</InputLabel>
                                            <Select label='Occupation' name="Occupation" onChange={handleChange}>
                                                <MenuItem value={"Worker"}>Worker</MenuItem>
                                                <MenuItem value={"Student"}>Student</MenuItem>
                                                <MenuItem value={"Other"}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth margin="normal" label="Other Details (e.g., pets, smokers, etc.)" name="Other_Details" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">* Your Information :</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth margin="normal" label="Full Name" name="Full_Name" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth margin="normal" label="Email" type="email" name="Email" onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <PhoneInput country={'be'} onChange={(value) => setFormData({ ...formData, Phone: '+' + value })} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">* Housing Photos :</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            startIcon={<AddPhotoAlternateIcon />}
                                        >
                                            Upload Photos
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
                                        <Box display="flex" flexWrap="wrap">
                                            {selectedImages.map((image, index) => (
                                                <Box key={index} position="relative" margin="5px">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Image ${index}`}
                                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            backgroundColor: 'white'
                                                        }}
                                                        onClick={() => handleRemoveImage(index)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} padding={2} display="flex" justifyContent="flex-end">
                                        <Button type="button" variant="contained" color="inherit" onClick={() => window.location.reload()}>Cancel</Button>
                                        <Button sx={{ marginLeft: '10px' }} type="submit" variant="contained" disabled={isLoading} color="primary">
                                            {isLoading ? <CircularProgress size={12} /> : 'Confirm'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default AddRoommate;
