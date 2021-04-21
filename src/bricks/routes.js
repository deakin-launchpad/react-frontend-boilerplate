/***
*  Created by Sanchit Dang
***/
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts';
import { Login, Register, Home, MobileMenu, FourOFour, Example } from 'views';
import { Layout } from './layout';
import { LayoutConfig } from 'constants/index';
import { LoadingScreen } from 'components';
import { AuthCallback } from 'views/index';

export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);
  let landingPage = (LayoutConfig.landingPage !== undefined ? LayoutConfig.landingPage !== '' ? LayoutConfig.landingPage : '/home' : '/home');
  if (loginStatus === undefined) return <LoadingScreen />;
  return (
    <Switch>
      <Route exact path='/' render={() => (((!loginStatus) ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Redirect to={{
        pathname: landingPage
      }} {...props} />))} />
      <Route exact path='/auth/callback/:ssoToken' render={(props) => <AuthCallback {...props} />} />
      <Route exact path='/login' render={() => ((!loginStatus ? <Login  {...props} /> : <Redirect to={{ pathname: landingPage }} {...props} />))} />
      <Route exact path='/register' render={() => ((!loginStatus ? <Register {...props} /> : <Redirect to={{ pathname: landingPage }} {...props} />))} />
      <Route exact path='/home' render={() => ((loginStatus === false ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><Home {...props} /></Layout>))} />
      <Route exact path='/menu' render={() => ((loginStatus === false ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <Layout> <MobileMenu  {...props} /></Layout>))} />
      <Route exact path='/examples' render={() => ((loginStatus === false ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <Layout> <Example  {...props} /></Layout>))} />
      <Route render={() => ((loginStatus === false ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <Layout><FourOFour  {...props} /></Layout>))} />
    </Switch >
  );
};