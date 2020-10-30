import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';

const Routes = () => {
  const { auth } = useSelector(state => state.auth)
  return (
    <Switch>
      {
        auth ? <Redirect to='/' /> : <>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </>
      }
    </Switch>
  )
}

export default Routes;