import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './Components/Navbar';
import { loadAuth } from './Redux/auth/actions';
import Routes from './Routes';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAuth())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}

export default App;
