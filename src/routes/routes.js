/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts'
import { Login, Register, Home, MobileMenu } from 'views'
import { Layout } from '../layout';

export const AppRoutes = () => {
  const { loginStatus } = useContext(LoginContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  useEffect(() => {
    if (loginStatus)
      setRedirectToLogin(false);
    else
      setRedirectToLogin(true);
  }, [loginStatus])
  return (
    <Switch>
      <Route exact path='/' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Redirect to={{ pathname: '/home' }} />))} />
      <Route exact path='/login' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: '/home' }} /> : <Login />))} />
      <Route exact path='/register' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: '/home' }} /> : <Register />))} />
      <Layout>
        <Route exact path='/home' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <Home />))} />
        <Route exact path='/menu' render={() => ((redirectToLogin ? <Redirect to={{ pathname: '/login' }} /> : <MobileMenu />))} />
      </Layout>
    </Switch>
  )
};
