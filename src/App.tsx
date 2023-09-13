import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ExitToApp as ExitToAppIcon,
  Home as HomeIcon,
  List as ListIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Logs from './components/Logs';
import SignUp from './components/SignUp';
import Settings from './components/Settings';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in status

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to handle sign-in
  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              {isSignedIn && (
                  <IconButton color="inherit" onClick={toggleDrawer}>
                    <MenuIcon />
                  </IconButton>
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  Smart Home Safety System
                </Typography>
              </Box>
              <Box>
                {isSignedIn && (
                    <>
                      <IconButton component={Link} to="/settings" color="inherit">
                        <SettingsIcon />
                      </IconButton>
                      <IconButton component={Link} to="/update-profile" color="inherit">
                        <PersonIcon />
                      </IconButton>
                      <IconButton component={Link} to="/signin" color="inherit" onClick={handleSignOut}>
                        <ExitToAppIcon />
                      </IconButton>
                    </>
                )}
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer} sx={{ width: '170px' }}>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/logs">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Logs" />
              </ListItem>
            </List>
          </Drawer>
          <Routes>
            <Route
                path="/signin"
                element={isSignedIn ? <Navigate to="/" /> : <SignIn handleSignIn={handleSignIn} />}
            />
            <Route
                path="/signup"
                element={isSignedIn ? <Navigate to="/" /> : <SignUp />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            {isSignedIn ? (
                <>
                  <Route path="/" element={<Home handleSignOut={handleSignOut} />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/settings" element={<Settings />} />
                </>
            ) : (
                <Route path="/" element={<Navigate to="/signin" />} />
            )}
          </Routes>
        </div>
      </Router>
  );
};

export default App;
