import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const defaultTheme = createTheme();

const SignInContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

interface SignInProps {
  handleSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ handleSignIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Login successful!');
          handleSignIn(); // Call handleSignIn after successful login
          navigate('/home');
        })
        .catch((error) => {
          console.log('Login error:', error);
          setOpenModal(true); // Open the error modal
        });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <SignInContainer>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </SignInContainer>
        </Container>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Invalid Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1">The provided email and password are invalid.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>OK</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
  );
};

export default SignIn;
