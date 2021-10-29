//Library components
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Grid } from '@mui/material';
import SensorCard from './SensorCard';
import { styled } from '@mui/system';

//Create spacer for AppBar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

//API Fetch function
async function getJsonFromApi(url) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" >
              Breezeway
            </Typography>
          </Toolbar>
        </AppBar>
        <Offset />

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={4}>
            <SensorCard sensorName={getJsonFromApi('/Window').responseJson} sensorValue="72"/>
          </Grid>
          <Grid item xs={4}>
            <SensorCard sensorName="Outside" sensorValue="80"/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
