import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '1rem 0.5rem'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function StudentCard({ _id, name, grade, gender, age }) {
  const classes = useStyles();

  const history = useHistory()

  return (
    <Card component={Button} onClick={() => { history.push(`/${_id}`) }} className={classes.root}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          {name} - {age}
        </Typography>
        <Typography variant='body1' gutterBottom>
          Gender : {{ 'M': 'Male', 'F': 'Female' }[gender] || 'Other'}
        </Typography>
        <Typography>
          Grade : {grade}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
