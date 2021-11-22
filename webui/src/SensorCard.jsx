import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getDatabase, off, onValue, ref } from '@firebase/database';
import TimeAgo from 'timeago-react';

export default function SensorCard(props) {
  //Create state for sensor data
  const [data, setData] = useState({sensorName: props.endpoint, sensorValue: "null", lastRead: "null"});
  const db = getDatabase();
  const sensorRef = ref(db, '/' + props.endpoint);

  useEffect(() => {
    //Create RTDB listner
    onValue(sensorRef, (snapshot) => {
      let data = snapshot.val();
      setData({
        sensorName: data.name,
        sensorValue: data.temperature.toFixed(1),
        lastRead: data.lastRead
      });
    });
    //Detach RTDB when component is unmounted
    return() => off(sensorRef);
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
          <Typography variant="body2" component="div">
            Last updated: <TimeAgo datetime={data.lastRead} />
          </Typography>
        </CardContent>
      </Card>
    );
  }