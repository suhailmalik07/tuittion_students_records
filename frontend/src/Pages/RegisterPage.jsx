import React, { useState } from 'react';
import Form from '../Components/Form';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux';
import { login, register } from '../Redux/auth/actions';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const dispatch = useDispatch()

  const handleRegister = e => {
    dispatch(register({ name, email, password }, history))
  }

  return (
    <div>
      <Form onSubmit={handleRegister} >
        <Typography align='center' variant='h3' > Register </Typography>

        <TextField label='Name' value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Enter your name here!' variant='outlined' required />
        <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Enter your email here!' variant='outlined' required />
        <TextField label='Password' value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter your password here!' variant='outlined' required />

        <Button variant='contained' type='submit' color='primary'>Register</Button>
      </Form>
    </div>
  )
}

export default RegisterPage;