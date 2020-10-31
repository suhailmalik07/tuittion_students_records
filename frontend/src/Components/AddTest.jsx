import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from './Modal';
import Form from './Form';
import { Button, TextField, Typography } from '@material-ui/core';
import auth0 from '../Api/auth0';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#fff',
  }
}));

export default function AddTest({ _id, open, handleClose }) {

  const { token } = useSelector(state => state.auth)

  const dateObj = new Date()
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const newDate = year + "-" + month + "-" + day;

  const classes = useStyles();
  const [state, setState] = useState({ name: "", subject: "", date: newDate, marks: 0 })

  const handleChange = e => {
    const { value, name } = e.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const addTest = () => {
    auth0.post(`http://localhost:8000/api/students/${_id}`, { ...state }, { headers: { authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        console.log('added');
        handleClose()
      })
      .catch((error) => console.log(error.message))
  }


  return (

    <CustomModal open={open} handleClose={handleClose} >
      <Form className={classes.form} onSubmit={addTest} >
        <Typography variant='h4' align='center' >Add Test</Typography>

        <TextField label='Name' value={state.name} name="name" onChange={handleChange} type='text' placeholder='Enter Test name here!' variant='outlined' required />
        <TextField label='subject' value={state.subject} name="subject" onChange={handleChange} type='text' placeholder='Enter Test subject here!' variant='outlined' required />
        <TextField label='marks' value={state.marks} name="marks" onChange={handleChange} type='number' min={1} max={100} placeholder='Enter student marks here!' variant='outlined' required />
        <TextField label='date' value={state.date} name="date" onChange={handleChange} type='date' placeholder='Enter test date!' variant='outlined' required />

        <Button variant='contained' color='primary' type='submit'>Add</Button>
        <Button variant='contained' color='default' onClick={handleClose}>Cancel</Button>
      </Form>
    </CustomModal>
  );
}
