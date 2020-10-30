import Axios from 'axios';
import auth0 from '../../Api/auth0';
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS, LOAD_LOGIN
} from './actionTypes';

export const loginRequest = payload => ({
  type: LOGIN_REQUEST,
  payload
})

export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
})

export const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload
})

export const saveAuth = payload => dispatch => {
  localStorage.setItem('token', payload.token)
  localStorage.setItem('email', payload.email)
}

export const loadAuthActionCreator = payload => ({
  type: LOAD_LOGIN,
  payload
})


export const loadAuth = () => dispatch => {
  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  if (email && token) {
    dispatch(loadAuthActionCreator({ email, token }))
  }
}


export const login = payload => async dispatch => {
  dispatch(loginRequest())

  try {
    const { data } = await Axios.post('http://localhost:8000/api/login', payload, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    dispatch(loginSuccess(data))
    dispatch(saveAuth(data))
  } catch (error) {
    dispatch(loginFailure(error.response.data.message))
  }
}

export const registerRequest = payload => ({
  type: REGISTER_REQUEST,
  payload
})

export const registerSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload
})

export const registerFailure = payload => ({
  type: REGISTER_FAILURE,
  payload
})


export const register = (payload, history) => async dispatch => {
  dispatch(registerRequest())

  try {
    const { data } = await auth0.post('http://localhost:8000/api/register', payload)
    dispatch(registerSuccess(data))
    history.push('/login')
  } catch (error) {
    dispatch(registerFailure(error.response.data.message))
  }
}



