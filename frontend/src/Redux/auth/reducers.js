import {
  LOAD_LOGIN, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT
} from './actionTypes';

const initState = {
  auth: false,
  email: "",
  name: "",
  token: ""
}

const reducers = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true }
    case LOGIN_SUCCESS:
      return { ...state, ...payload, auth: true, loading: false }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: true, message: payload }

    case LOAD_LOGIN:
      return { ...state, loading: false, error: false, auth: true, ...payload }

    case LOGOUT:
      return { ...state, auth: false }

    case REGISTER_REQUEST:
      return { ...state, loading: true }
    case REGISTER_SUCCESS:
      return { ...state, ...payload, loading: false, message: payload.message }
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: true, message: payload }

    default:
      return state
  }
}

export default reducers;