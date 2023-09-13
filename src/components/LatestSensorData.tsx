import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getDatabase, ref, query, orderByChild, limitToLast, get, DataSnapshot } from 'firebase/database';

const LatestSensorData: React.FC<{ dataType: string }> = ({ dataType }) => {
  const [latestData, setLatestData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const sensorDataRef = ref(db, 'sensor-data');
      const sensorDataQuery = query(sensorDataRef, orderByChild('timestamp'), limitToLast(1));

      try {
        const snapshot = (await get(sensorDataQuery)) as DataSnapshot;
        if (snapshot.exists()) {
          const data = snapshot.val();
          const latestEntry = Object.values(data)[0];
          setLatestData(latestEntry);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Get the image source based on the dataType prop
  const getImageSource = (dataType: string) => {
    switch (dataType) {
      case 'Gas':
        return './assets/smoke(1).png';
      case 'Flame':
        return './assets/fire(1).png';
      case 'Motion':
        return './assets/motion(1).png';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={getImageSource(dataType)} alt={dataType} style={{ width: '90%', height: '76%' }} />
        <Typography variant="h6">{dataType}</Typography>
        {latestData ? (
          <>
            <Typography variant="body1">Value: {latestData[dataType.toLowerCase()]}</Typography>
            <Typography variant="body2">Timestamp: {latestData.timestamp}</Typography>
          </>
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestSensorData;
