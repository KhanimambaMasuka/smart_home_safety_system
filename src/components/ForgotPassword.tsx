import React, {FormEvent, useState} from 'react';
import {styled} from '@mui/system';
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {auth} from '../firebase';
import {sendPasswordResetEmail} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const defaultTheme = createTheme();

const ForgotPasswordContainer = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Password reset email sent!');
            navigate('/signin'); // Redirect to the sign-in page after sending the password reset email
        } catch (error) {
            console.log('Password reset error:', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <ForgotPasswordContainer>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Reset Password
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/signin" variant="body2">
                                    Return to Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </ForgotPasswordContainer>
            </Container>
        </ThemeProvider>
    );
};

export default ForgotPassword;
