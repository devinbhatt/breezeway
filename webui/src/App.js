//Library components
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Grid } from '@mui/material';
import  SensorCard from './SensorCard';
import { styled } from '@mui/system';

//Create spacer for AppBar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

//Create axios client for getting API data
const client = axios.create({
  baseURL: "http://172.31.199.12:3000"
});

async function getSensors() {
  try {
    let res = await client.get('/endpoints')
    return res.data
  } catch (err) {
    console.error(err);
  }
}


export default function App() {
  //Create state variable for sensor cards
  const [sensorCards, setSensorCards] = useState([]);
  //create getData funtion and sensors array
  React.useEffect(() => {
    getSensors().then(apiResponse => {
      setSensorCards([]);
      apiResponse.forEach(element => {
        setSensorCards(prevState => [prevState, <Grid item xs={5}><SensorCard endpoint={element} key={element}/></Grid>]);
      });
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h5" >
              Breezeway
            </Typography>
          </Toolbar>
        </AppBar>
        <Offset />

        <Grid container spacing={4} justifyContent="center">
          {sensorCards}
        </Grid>
      </Box>
    </Container>
  );
}
