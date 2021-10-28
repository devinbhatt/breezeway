import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';

export default function BasicCard(props) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" component="div">
            {props.sensorName}
          </Typography>
          <Typography variant="h5" component="div">
            {props.sensorValue}
          </Typography>
        </CardContent>
      </Card>
    );
  }