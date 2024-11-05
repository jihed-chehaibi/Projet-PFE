// FilePath: /path/to/UserProfile.jsx

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../Config-DB/firebase-config';
import { getAuth } from 'firebase/auth';
import { Avatar, Typography, Button, Card, CardContent, CircularProgress, Container, Box } from '@mui/material';
import { Home as HomeIcon, AdUnits as AdUnitsIcon, Lock as LockIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Navbar from './NavBar/Navbar';

export default function UserProfile() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                try {
                    const userQuery = query(collection(firestore, 'users'), where("userId", "==", user.uid));
                    const userSnapshot = await getDocs(userQuery);
                    if (!userSnapshot.empty) {
                        const userData = userSnapshot.docs[0].data();
                        setUserProfile(userData);
                    } else {
                        console.log("User document not found or user ID doesn't match.");
                    }
                } catch (error) {
                    console.error("Error fetching user document: ", error);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#f4f4f9', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Navbar />
            <motion.div
                style={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
                    top: '-50%',
                    left: '-50%',
                    zIndex: -1,
                }}
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 60,
                    ease: 'linear',
                    loop: Infinity,
                }}
            />
            <Container maxWidth="sm" style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', marginTop: '5%' }}>
                {userProfile && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box sx={{ textAlign: 'center' }}>
                            {userProfile.SelfieUrl && (
                                <Avatar alt="User selfie" src={userProfile.SelfieUrl} sx={{ width: 100, height: 100, margin: '0 auto 20px' }} />
                            )}
                            <Typography variant="h5" gutterBottom>{userProfile.name}</Typography>
                            
                            <Card sx={{ mt: 4, boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Personal Information</Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Profession:</strong> {userProfile.profession}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Phone:</strong> {userProfile.phone}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Email:</strong> {userProfile.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <a href="/WelcomePage">
                                    <Button variant="contained" color="primary" sx={{ mx: 1 }} startIcon={<HomeIcon />}>Home</Button>
                                </a>
                                <a href="/Your_ad">
                                    <Button variant="contained" color="secondary" sx={{ mx: 1 }} startIcon={<AdUnitsIcon />}>Your Ads</Button>
                                </a>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <a href="/ForgotPassword">
                                    <Button variant="outlined" color="secondary" sx={{ mx: 1 }} startIcon={<LockIcon />}>Change Password</Button>
                                </a>
                            </Box>
                        </Box>
                    </motion.div>
                )}
            </Container>
        </div>
    );
}
