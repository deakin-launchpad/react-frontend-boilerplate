/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginContext } from 'contexts'
import { Login, Register } from 'views'

const Home = () => {
  return (
    "WELCOME to HOME"
  )
}

export const AppRoutes = () => {
  const { loginStatus } = useContext(LoginContext);
  const [redirectToLogin, setRedirectToLogin] = useState(true);
  useEffect(() => {
    if (loginStatus)
      setRedirectToLogin(false);
    else
      setRedirectToLogin(true);
  }, [loginStatus])
  return (
    <Switch>
      <Route exact path='/' render={() => ((redirectToLogin ? <Login /> : <Home />))} />
      <Route exact path='/login' render={() => ((redirectToLogin ? <Login /> : <Home />))} />
      <Route exact path='/register' render={() => ((redirectToLogin ? <Register /> : <Register />))} />
    </Switch>
  )
};
