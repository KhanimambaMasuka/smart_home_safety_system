import React, { useState, useEffect } from 'react';
import { Typography, Switch } from '@mui/material';
import { getDatabase, ref, onValue, set, off } from 'firebase/database';

const Settings: React.FC = () => {
  const [motionSensorOn, setMotionSensorOn] = useState<boolean>(false);

  // Function to handle the switch toggle
  const handleToggle = async () => {
    const db = getDatabase();
    const motionSensorRef = ref(db, 'motion-sensor');

    try {
      const value: number = motionSensorOn ? 0 : 1; // 1 for on, 0 for off
      await set(motionSensorRef, value);
      setMotionSensorOn(!motionSensorOn);
    } catch (error) {
      console.log('Error updating motion sensor state:', error);
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const motionSensorRef = ref(db, 'motion-sensor');

    // Listen for changes in the motion sensor value
    onValue(motionSensorRef, (snapshot) => {
      const motionSensorValue: number = snapshot.val();
      setMotionSensorOn(motionSensorValue === 1); // Set the state based on the value from Firebase
    });

    return () => {
      // Clean up the Firebase listener when the component unmounts
      // This prevents memory leaks and unnecessary listener calls
      // when the component is no longer in use
      off(motionSensorRef);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6">Settings</Typography>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="body1">Motion Sensor:</Typography>
        <Switch checked={motionSensorOn} onChange={handleToggle} color="primary" />
      </div>
    </div>
  );
};

export default Settings;
