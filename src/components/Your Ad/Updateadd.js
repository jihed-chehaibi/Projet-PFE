import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Grid } from '@mui/material';
import Navbar from '../NavBar/Navbar';
import { firestore } from '../../Config-DB/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function UpdateAd() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const roomDoc = await getDoc(doc(firestore, 'Rooms', id));
                if (roomDoc.exists()) {
                    setRoom({ id: roomDoc.id, ...roomDoc.data() });
                } else {
                    console.error("No such room document!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching room details: ", error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    const handleUpdate = async () => {
        try {
            // Mettre à jour les détails de la pièce dans la base de données Firestore
            await updateDoc(doc(firestore, 'Rooms', id), {
                Title: room.Title,
                Location: room.Location,
                description: room.description,
                Price: room.Price,
                Type: room.Type,
                numero: room.numero,
                // Ajoutez d'autres champs ici selon vos besoins
            });
            alert("Room details updated successfully!");
        } catch (error) {
            console.error("Error updating room details: ", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <Grid container justifyContent="center" spacing={4} sx={{ mt: 1 }} >
                
                <Grid item xs={12} lg={5}>
                <Typography variant="h6" align="center" className='Title'sx={{ mb: 3  ,  fontWeight: 'bold', fontSize: '30px',borderTopLeftRadius: '10px',borderTopRightRadius: '10px' }} >Update Room Or House Ads</Typography>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={room.Title}
                        onChange={(e) => setRoom({ ...room, Title: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={room.Location}
                        onChange={(e) => setRoom({ ...room, Location: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={room.description}
                        onChange={(e) => setRoom({ ...room, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        value={room.Price}
                        onChange={(e) => setRoom({ ...room, Price: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Type"
                        variant="outlined"
                        fullWidth
                        value={room.Type}
                        onChange={(e) => setRoom({ ...room, Type: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        value={room.numero}
                        onChange={(e) => setRoom({ ...room, numero: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Button onClick={handleUpdate} variant="contained" color="success">Update</Button>
                </Grid>
            </Grid>
        </div>
    );
}
