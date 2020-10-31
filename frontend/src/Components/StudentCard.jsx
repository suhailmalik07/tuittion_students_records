import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: '48%',
    margin: '1rem 0.5rem',
    textAlign: 'left'
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
    <Card onClick={() => { history.push(`/${_id}`) }} className={classes.root}>
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
    </Card>
  );
}