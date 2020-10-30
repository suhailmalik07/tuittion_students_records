import React, { useState } from 'react';
import Form from '../Components/Form';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/auth/actions';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, message } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleLogin = e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div>
      <Form onSubmit={handleLogin} >
        <Typography align='center' variant='h3' > Login </Typography>

        <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Enter your email here!' variant='outlined' required />
        <TextField label='Password' value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter your password here!' variant='outlined' required />

        <Button variant='contained' color='primary' onClick={handleLogin}>Login</Button>

      </Form>
    </div>
  )
}

export default LoginPage;