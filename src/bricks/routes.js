/***
*  Created by Sanchit Dang
***/
import { LoadingScreen } from 'components';
import { LayoutConfig } from 'constants/index';
import { LoginContext } from 'contexts';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthCallback, Example, FourOFour, Home, Login, MobileMenu, Register, UsersManager } from 'views';
import { Layout } from './layout';

export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);
  let landingPage = (LayoutConfig.landingPage !== undefined ? LayoutConfig.landingPage !== '' ? LayoutConfig.landingPage : '/home' : '/home');
  if (loginStatus === undefined) return <LoadingScreen />;

  const AuthRoute = ({ children, redirectTo }) => {
    return loginStatus === false ? <Navigate to={redirectTo} {...props} /> : children;
  };

  AuthRoute.propTypes = {
    children: PropTypes.element.isRequired,
    redirectTo: PropTypes.string.isRequired,
  };

  const UnauthRoute = ({ children, redirectTo }) => {
    return !loginStatus ? children : <Navigate to={redirectTo} {...props} />;
  };

  UnauthRoute.propTypes = {
    children: PropTypes.element.isRequired,
    redirectTo: PropTypes.string.isRequired,
  };

  return (
    <Routes>
      <Route exact path='/'
        element={
          <UnauthRoute redirectTo={landingPage} >
            <Navigate to={{ pathname: '/login' }} {...props} />
          </UnauthRoute>}
      />
      <Route exact path='/auth/callback/:ssoToken' element={(props) => <AuthCallback {...props} />} />
      <Route exact path='/login'
        element={<UnauthRoute redirectTo={landingPage}>
          <Login {...props} />
        </UnauthRoute>}
      />

      <Route exact path='/register'
        element={<UnauthRoute redirectTo={landingPage}>
          <Register {...props} />
        </UnauthRoute>}
      />

      <Route exact path='/home' element={
        <AuthRoute redirectTo='/login'>
          <Layout><Home {...props} /></Layout>
        </AuthRoute>}
      />

      <Route exact path='/menu' element={
        <AuthRoute redirectTo='/login'>
          <Layout> <MobileMenu  {...props} /></Layout>
        </AuthRoute>}
      />

      <Route exact path='/examples' element={
        <AuthRoute redirectTo='/login'>
          <Layout> <Example  {...props} /></Layout>
        </AuthRoute>}
      />

      <Route exact path='/users' element={
        <AuthRoute redirectTo='/login'>
          <Layout> <UsersManager  {...props} /></Layout>
        </AuthRoute>}
      />

      <Route element={
        <AuthRoute redirectTo='/login'>
          <Layout> <FourOFour  {...props} /></Layout>
        </AuthRoute>}
      />
    </Routes >
  );
};