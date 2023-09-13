import React from 'react';
import { Grid } from '@mui/material';
import LatestSensorData from './LatestSensorData';
import SensorDataChart from './SensorDataChart';

interface HomeProps {
  handleSignOut: () => void;
}

const Home: React.FC<HomeProps> = ({ handleSignOut }) => {
  return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <div style={{ padding: '8px' }}>
              <LatestSensorData dataType="Flame" />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ padding: '8px' }}>
              <LatestSensorData dataType="Gas" />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{ padding: '8px' }}>
              <LatestSensorData dataType="Motion" />
            </div>
          </Grid>
        </Grid>

        <div style={{ marginTop: '16px', padding: '8px' }}>
          <SensorDataChart />
        </div>
      </div>
  );
};

export default Home;
