import Axios from 'axios';
import {
  LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS
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


export const login = payload => async dispatch => {
  dispatch(loginRequest())

  try {
    const { data } = await Axios.post('http://localhost:8000/api/login', payload, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    dispatch(loginSuccess(data))
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


export const register = payload => async dispatch => {
  dispatch(registerRequest())

  try {
    const { data } = await Axios.post('http://localhost:8000/api/register', payload, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    dispatch(registerSuccess(data))
  } catch (error) {
    dispatch(registerFailure(error.response.data.message))
  }
}



