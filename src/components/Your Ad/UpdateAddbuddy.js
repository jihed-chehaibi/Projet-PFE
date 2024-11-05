import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Grid } from '@mui/material';
import Navbar from '../NavBar/Navbar';
import { firestore } from '../../Config-DB/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function UpdateBuddyAd() {
    const { id } = useParams();
    const [buddy, setBuddy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuddyDetails = async () => {
            try {
                const buddyDoc = await getDoc(doc(firestore, 'Buddy', id));
                if (buddyDoc.exists()) {
                    setBuddy({ id: buddyDoc.id, ...buddyDoc.data() });
                } else {
                    console.error("No such buddy document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching buddy details: ", error);
            }
        };

        fetchBuddyDetails();
    }, [id]);

    const handleUpdate = async () => {
        try {
            // Mettre à jour les détails du buddy dans la base de données Firestore
            await updateDoc(doc(firestore, 'Buddy', id), {
                Title: buddy.Title,
                City: buddy.City,
                PostalCode: buddy.PostalCode,
                Country: buddy.Country,
                Type_of_Accommodation: buddy.Type_of_Accommodation,
                rooms_available: buddy.rooms_available,
                Monthly_Rent: buddy.Monthly_Rent,
                Monthly_Charges: buddy.Monthly_Charges,
                Minimum_Age_of_Desired_Roommates: buddy.Minimum_Age_of_Desired_Roommates,
                Gender_of_Desired_Roommates: buddy.Gender_of_Desired_Roommates,
                Language: buddy.Language,
                Preferences_in_Terms_of_Behavior: buddy.Preferences_in_Terms_of_Behavior,
                Hobbies: buddy.Hobbies,
                Occupation: buddy.Occupation,
                Other_Details: buddy.Other_Details,
                Email: buddy.Email,
                Phone: buddy.Phone,
                // Ajoutez d'autres champs ici selon vos besoins
            });
            alert("Buddy details updated successfully!");
        } catch (error) {
            console.error("Error updating buddy details: ", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <Grid container justifyContent="center" spacing={4} sx={{ mt: 1 ,  mb: 5  }} >
                <Grid item xs={12} lg={6}>
                    <Typography variant="h6" align="center" className='Title'sx={{ mb: 3  ,  fontWeight: 'bold', fontSize: '30px',borderTopLeftRadius: '10px',borderTopRightRadius: '10px' }} >Update Buddy Ad</Typography>
                    <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField label="Title" variant="outlined" fullWidth value={buddy.Title} onChange={(e) => setBuddy({ ...buddy, Title: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="City" variant="outlined" fullWidth value={buddy.City} onChange={(e) => setBuddy({ ...buddy, City: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Postal Code" variant="outlined" fullWidth value={buddy.PostalCode} onChange={(e) => setBuddy({ ...buddy, PostalCode: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
        </Grid>
        
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField label="Country" variant="outlined" fullWidth value={buddy.Country} onChange={(e) => setBuddy({ ...buddy, Country: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Type of Accommodation" variant="outlined" fullWidth value={buddy.Type_of_Accommodation} onChange={(e) => setBuddy({ ...buddy, Type_of_Accommodation: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Rooms Available" variant="outlined" fullWidth value={buddy.rooms_available} onChange={(e) => setBuddy({ ...buddy, rooms_available: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField label="Monthly Rent" variant="outlined" fullWidth value={buddy.Monthly_Rent} onChange={(e) => setBuddy({ ...buddy, Monthly_Rent: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField label="Monthly Charges" variant="outlined" fullWidth value={buddy.Monthly_Charges} onChange={(e) => setBuddy({ ...buddy, Monthly_Charges: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
            <TextField label="Minimum Age of Desired Roommates" variant="outlined" fullWidth value={buddy.Minimum_Age_of_Desired_Roommates} onChange={(e) => setBuddy({ ...buddy, Minimum_Age_of_Desired_Roommates: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField label="Gender of Desired Roommates" variant="outlined" fullWidth value={buddy.Gender_of_Desired_Roommates} onChange={(e) => setBuddy({ ...buddy, Gender_of_Desired_Roommates: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
            <TextField label="Language" variant="outlined" fullWidth value={buddy.Language} onChange={(e) => setBuddy({ ...buddy, Language: e.target.value })} sx={{ mb: 2 }} />
            </Grid>
        </Grid>

                    <TextField label="Preferences in Terms of Behavior" variant="outlined" fullWidth value={buddy.Preferences_in_Terms_of_Behavior} onChange={(e) => setBuddy({ ...buddy, Preferences_in_Terms_of_Behavior: e.target.value })} sx={{ mb: 2 }} />
                    <TextField label="Hobbies" variant="outlined" fullWidth value={buddy.Hobbies} onChange={(e) => setBuddy({ ...buddy, Hobbies: e.target.value })} sx={{ mb: 2 }} />
                    <TextField label="Occupation" variant="outlined" fullWidth value={buddy.Occupation} onChange={(e) => setBuddy({ ...buddy, Occupation: e.target.value })} sx={{ mb: 2 }} />
                    <TextField label="Other Details" variant="outlined" fullWidth value={buddy.Other_Details} onChange={(e) => setBuddy({ ...buddy, Other_Details: e.target.value })} sx={{ mb: 2 }} />
                    <TextField label="Email" variant="outlined" fullWidth value={buddy.Email} onChange={(e) => setBuddy({ ...buddy, Email: e.target.value })} sx={{ mb: 2 }} />
                    <TextField label="Phone" variant="outlined" fullWidth value={buddy.Phone} onChange={(e) => setBuddy({ ...buddy, Phone: e.target.value })} sx={{ mb: 2 }} />


                    {/* Ajoutez les autres champs de mise à jour ici */}
                    <Button onClick={handleUpdate} variant="contained" color="success">Update</Button>
                </Grid>
            </Grid>
        </div>
    );
}
