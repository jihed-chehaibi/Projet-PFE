// FilePath: /path/to/ForgotPassword.jsx

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Config-DB/firebase-config";
import { Grid, Button, TextField, Alert, Typography } from "@mui/material";
import { Email as EmailIcon, LockReset as LockResetIcon } from '@mui/icons-material';
import './ForgetPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setResetSuccess(true);
        } catch (error) {
            setError(error.code);
        }
    };

    return (
        <div className="container">
            <Grid container direction="column" justifyContent="center" alignItems="center" className="grid-container">
                <Grid item sx={{ marginBottom: 3 }}>
                    {error && <Alert variant="filled" severity="error" className="alert">Email Not Found</Alert>}
                    <Typography variant="h4" component="h1" className="title"><LockResetIcon /> Change Password</Typography>
                </Grid>
                
                {resetSuccess ? (
                    <Alert variant="filled" severity="success" className="alert">Check your email for password reset instructions.</Alert>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Enter Email"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <EmailIcon />
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" fullWidth sx={{ marginTop: 2 }} className="button">Confirm</Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Grid>
        </div>
    );
}

export default ForgotPassword;
