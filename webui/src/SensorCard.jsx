import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SensorCard(props) {
  //Function to get data from enpoint
  async function getData(endpoint) {
    try {
      let res = await axios.get("http://172.31.199.12:3000/"+endpoint);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  //Create state for sensor data
  const [data, setData] = useState({sensorName: "null", sensorValue: "null"});

  React.useEffect(() => {
    console.log("endpoint: ", props.endpoint);
    //Fetch data from API every 2 seconds
    const refresh = setInterval(() => {
      getData(props.endpoint).then(apiResponse => {
        setData({sensorName: apiResponse.name, sensorValue: apiResponse.temperature});
      });
    }, 2000);

    //Clear the interval when component is unmounted
    return() => clearInterval(refresh)
  }, []);

    return (
      <Card>
        <CardContent>
          <Typography variant="h4" component="div">
            {data.sensorName}
          </Typography>
          <Typography variant="h5" component="div">
            {data.sensorValue + " °C"}
          </Typography>
        </CardContent>
      </Card>
    );
  }