import Axios from 'axios';

const auth = () => {
  return Axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export default auth;