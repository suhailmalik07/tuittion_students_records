import React, { useState } from 'react';
import Form from '../Components/Form';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Redux/auth/actions';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const dispatch = useDispatch()

  const handleRegister = e => {
    dispatch(register({ name, email, password }, history))
  }

  const { error, message } = useSelector(state => state.auth)

  const getError = (name) => {
    if (error && message?.includes(name)) {
      return message
    }
    return ''
  }

  return (
    <div>
      <Form onSubmit={handleRegister} >
        <Typography align='center' variant='h3' > Register </Typography>

        <TextField label='Name'
          value={name}
          error={Boolean(getError('name'))}
          helperText={getError('name')}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='Enter your name here!'
          variant='outlined'
          required
        />

        <TextField label='Email'
          error={Boolean(getError('email'))}
          helperText={getError('email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          placeholder='Enter your email here!'
          variant='outlined'
          required
        />

        <TextField label='Password'
          error={Boolean(getError('password'))}
          helperText={getError('password')}
          value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter your password here!' variant='outlined' required />

        <Button variant='contained' type='submit' color='primary'>Register</Button>

        {error && <Typography variant='caption' color='secondary' >{message} </Typography>}

        <Box marginTop='2rem' paddingTop='2rem' borderTop='1px solid #c4c4c4'>
          <Button variant='contained' fullWidth color='inherit' onClick={() => history.push('/login')}>Login Here</Button>
        </Box>
      </Form>
    </div>
  )
}

export default RegisterPage;