import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDatabase, onValue, ref } from 'firebase/database';

interface SensorData {
    gas: string;
    flame: string;
    motion: string;
}

const SensorDataChart: React.FC = () => {
    const [gasCount, setGasCount] = useState(0);
    const [flameCount, setFlameCount] = useState(0);
    const [motionCount, setMotionCount] = useState(0);

    useEffect(() => {
        const database = getDatabase();
        const sensorDataRef = ref(database, 'sensor-data');

        const fetchData = () => {
            onValue(sensorDataRef, (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    let gasCount = 0;
                    let flameCount = 0;
                    let motionCount = 0;

                    Object.values(data).forEach((sensorData: unknown) => {
                        const { gas, flame, motion } = sensorData as SensorData;

                        if (gas === '1') {
                            gasCount++;
                        }
                        if (flame === '1') {
                            flameCount++;
                        }
                        if (motion === '1') {
                            motionCount++;
                        }
                    });

                    setGasCount(gasCount);
                    setFlameCount(flameCount);
                    setMotionCount(motionCount);
                }
            });
        };

        fetchData();
    }, []);

    const chartData = [
        { name: 'Gas', count: gasCount },
        { name: 'Flame', count: flameCount },
        { name: 'Motion', count: motionCount },
    ];

    return (
        <div style={{ padding: '10px' }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SensorDataChart;
