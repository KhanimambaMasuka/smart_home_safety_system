import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { auth } from '../firebase';
import { updateEmail, updatePassword } from 'firebase/auth';

const UpdateProfile: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdateEmail = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updateEmail(user, email);
                setMessage('Email updated successfully!');
            } catch (error) {
                setMessage('Failed to update email. Please try again.');
                console.error('Update email error:', error);
            }
        }
    };

    const handleUpdatePassword = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updatePassword(user, password);
                setMessage('Password updated successfully!');
            } catch (error) {
                setMessage('Failed to update password. Please try again.');
                console.error('Update password error:', error);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Update Profile
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateEmail}>
                Update Email
            </Button>
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleUpdatePassword}>
                Update Password
            </Button>
            {message && <Typography color="text.secondary" mt={2}>{message}</Typography>}
        </Box>
    );
};

export default UpdateProfile;
