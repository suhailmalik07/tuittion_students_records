import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './actionTypes';

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

    default:
      return state
  }
}

export default reducers;