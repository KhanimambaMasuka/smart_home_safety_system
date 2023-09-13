import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { getDatabase, onValue, ref } from 'firebase/database';

interface SensorData {
  id: string;
  gas: string;
  flame: string;
  motion: string;
  timestamp: string;
}

const SensorDataTable: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const database = getDatabase();
    const sensorDataRef = ref(database, 'sensor-data');

    const fetchData = () => {
      onValue(sensorDataRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const sensorDataArray: SensorData[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          // Sort the data array based on the sort order
          sensorDataArray.sort((a, b) =>
              sortOrder === 'asc'
                  ? a.timestamp.localeCompare(b.timestamp)
                  : b.timestamp.localeCompare(a.timestamp)
          );

          setSensorData(sensorDataArray);
        }
      });
    };

    fetchData();
  }, [sortOrder]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sensorData.length - page * rowsPerPage);

  return (
      <div style={{ paddingTop: '1rem', paddingLeft: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>Logs</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSortOrderChange} style={{ cursor: 'pointer' }}>
                  ID
                </TableCell>
                <TableCell onClick={handleSortOrderChange} style={{ cursor: 'pointer' }}>
                  Gas Value
                </TableCell>
                <TableCell onClick={handleSortOrderChange} style={{ cursor: 'pointer' }}>
                  Flame Value
                </TableCell>
                <TableCell onClick={handleSortOrderChange} style={{ cursor: 'pointer' }}>
                  Motion Value
                </TableCell>
                <TableCell onClick={handleSortOrderChange} style={{ cursor: 'pointer' }}>
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                      ? sensorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : sensorData
              ).map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.gas === '1' ? 'Gas Detected' : 'No Gas Detected'}</TableCell>
                    <TableCell>{data.flame === '1' ? 'Fire Detected' : 'No Flames Detected'}</TableCell>
                    <TableCell>{data.motion === '1' ? 'Motion Detected' : 'No Motion Detected'}</TableCell>
                    <TableCell>{data.timestamp}</TableCell>
                  </TableRow>
              ))}
              {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sensorData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
  );
};

export default SensorDataTable;
