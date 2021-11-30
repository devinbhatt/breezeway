//Imports
import * as React from 'react';
import { useState } from 'react';
import { AppBar, Box, Container, Grid, Toolbar, Typography} from '@mui/material';
import { styled } from '@mui/system';
import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref } from 'firebase/database';
import  SensorCard from './SensorCard';
import firebaseConfig from './firebaseConfig'

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

function getSensors() {
  try {
    return get(ref(db, '/'));
  } catch (err) {
    console.error(`Error retreiving sensors from firebase: ${err}`);
  }
}

//Create spacer for AppBar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function App() {
  //Create state variable for sensor cards
  const [sensorCards, setSensorCards] = useState([]);
  //create getData funtion and sensors array
  React.useEffect(() => {
    getSensors().then(dbQuery => {
      setSensorCards([]);
      dbQuery.forEach(element => {
        setSensorCards(prevState => [prevState, <Grid item xs={5}><SensorCard endpoint={element.val().name} key={element.val().name}/></Grid>]);
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
