import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../Config-DB/firebase-config';
import { getAuth } from 'firebase/auth';
import { Typography, Card, CardContent, Grid, Button, TextField } from '@mui/material';
import Navbar from '../NavBar/Navbar';
import './Youradd.css';
import { Link } from 'react-router-dom';

export default function Yourad() {
    const [userRooms, setUserRooms] = useState([]);
    const [buddyRooms, setBuddyRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRooms = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                try {
                    const roomsQuery = query(collection(firestore, 'Rooms'), where("userId", "==", user.uid));
                    const roomsSnapshot = await getDocs(roomsQuery);
                    const roomsData = roomsSnapshot.docs.map(doc => {
                        const data = doc.data();
                        return { ...data, id: doc.id };
                    });
                    setUserRooms(roomsData);
                } catch (error) {
                    console.error("Error fetching user rooms: ", error);
                }
            }
        };

        const fetchBuddyRooms = async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error("User not authenticated.");
                return;
            }

            try {
                const buddyQuery = query(collection(firestore, 'Buddy'), where("userId", "==", currentUser.uid));
                const buddySnapshot = await getDocs(buddyQuery);
                const buddyData = buddySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return { ...data, id: doc.id };
                });
                setBuddyRooms(buddyData);
            } catch (error) {
                console.error("Error fetching buddy rooms: ", error);
            }
            setLoading(false);
        };

        fetchUserRooms();
        fetchBuddyRooms();
    }, []);

    const handleDelete = async (roomId, type) => {
        if (!roomId) {
            console.error("Room ID is undefined.");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to delete this ad?");
        if (!isConfirmed) {
            return;
        }

        try {
            const collectionName = type === "user" ? "Rooms" : "Buddy";
            await deleteDoc(doc(firestore, collectionName, roomId));
            console.log("Document successfully deleted!");
            alert("Document successfully deleted!");
            if (type === "user") {
                setUserRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
            } else {
                setBuddyRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
            }
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    } else if (userRooms.length === 0 && buddyRooms.length === 0) {
        return (
            <div>
                <Navbar />
                <Typography variant="h5" align="center" sx={{ mt: 30, fontWeight: 'bold' }}>
                    You haven't created any ads yet!
                </Typography>
                <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
                    Please check the sidebar to create ads.
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                {userRooms.map(room => (
                    <Grid item xs={12} lg={5} key={room.id}>
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Typography variant="h6" align="center" className='Title' sx={{ mb: 3 }}>
                                    Room or house Ads
                                </Typography>
                                <TextField disabled label="Title" variant="outlined" defaultValue={room.Title} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Location" variant="outlined" defaultValue={room.Location} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Description" variant="outlined" defaultValue={room.description} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Price" variant="outlined" defaultValue={room.Price} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Type" variant="outlined" defaultValue={room.Type} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Phone" variant="outlined" defaultValue={room.numero} fullWidth sx={{ mb: 2 }} />
                                <Button onClick={() => handleDelete(room.id, "user")} variant="contained" color="error">
                                    Delete
                                </Button>
                                <Button component={Link} to={`/update/${room.id}`} variant="outlined" color="success" sx={{ marginLeft: '3%' }}>
                                    Update
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {buddyRooms.map(buddy => (
                    <Grid item xs={12} lg={5} key={buddy.id}>
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Typography variant="h6" align="center" className='Title' sx={{ mb: 3 }}>
                                    Roommates Ads
                                </Typography>
                                <TextField disabled label="Title" variant="outlined" defaultValue={buddy.Title} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="City" variant="outlined" defaultValue={buddy.City} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="PostalCode" variant="outlined" defaultValue={buddy.PostalCode} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Country" variant="outlined" defaultValue={buddy.Country} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Type of Accommodation" variant="outlined" defaultValue={buddy.Type_of_Accommodation} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Rooms available" variant="outlined" defaultValue={buddy.rooms_available} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Monthly Rent" variant="outlined" defaultValue={buddy.Monthly_Rent} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Monthly Charges" variant="outlined" defaultValue={buddy.Monthly_Charges} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Minimum Age of Desired Roommates" variant="outlined" defaultValue={buddy.Minimum_Age_of_Desired_Roommates} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Gender of Desired Roommates" variant="outlined" defaultValue={buddy.Gender_of_Desired_Roommates} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Language" variant="outlined" defaultValue={buddy.Language} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Preferences in Terms of Behavior" variant="outlined" defaultValue={buddy.Preferences_in_Terms_of_Behavior} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Hobbies" variant="outlined" defaultValue={buddy.Hobbies} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Occupation" variant="outlined" defaultValue={buddy.Occupation} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Other Details" variant="outlined" defaultValue={buddy.Other_Details} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Email" variant="outlined" defaultValue={buddy.Email} fullWidth sx={{ mb: 2 }} />
                                <TextField disabled label="Phone" variant="outlined" defaultValue={buddy.Phone} fullWidth sx={{ mb: 2 }} />
                                <Button onClick={() => handleDelete(buddy.id, "buddy")} variant="contained" color="error">
                                    Delete
                                </Button>
                                <Button component={Link} to={`/updatebuddy/${buddy.id}`} variant="outlined" color="success" sx={{ marginLeft: '3%' }}>
                                    Update
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
