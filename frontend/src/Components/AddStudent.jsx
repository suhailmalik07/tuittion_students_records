import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from './Modal';
import Form from './Form';
import { Button, TextField, Typography } from '@material-ui/core';
import auth0 from '../Api/auth0';

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#fff',
  }
}));

export default function AddStudent({ open, handleClose }) {
  const classes = useStyles();
  const [state, setState] = useState({ name: "", grade: "", gender: "", age: 18 })

  const handleChange = e => {
    const { value, name } = e.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const addStudent = () => {
    console.log('here')
    auth0.post('http://localhost:8000/api/students', { ...state })
      .then(({ data }) => console.log('added'))
      .catch((error) => console.log(error.message))
  }

  return (

    <CustomModal open={open} handleClose={handleClose} >
      <Form className={classes.form} onSubmit={addStudent} >
        <Typography variant='h4' align='center' >Add Student</Typography>

        <TextField label='Name' value={state.name} name="name" onChange={handleChange} type='text' placeholder='Enter student name here!' variant='outlined' required />
        <TextField label='Grade' value={state.grade} name="grade" onChange={handleChange} type='text' placeholder='Enter student grade here!' variant='outlined' required />
        <TextField label='Gender' value={state.gender} name="gender" onChange={handleChange} type='text' placeholder='Enter student gender here!' variant='outlined' required />
        <TextField label='Age' value={state.age} name="age" onChange={handleChange} type='number' min={1} max={150} placeholder='Enter age name here!' variant='outlined' required />

        <Button variant='contained' color='primary' type='submit'>Add</Button>
        <Button variant='contained' color='default' onClick={handleClose}>Cancel</Button>
      </Form>
    </CustomModal>
  );
}
