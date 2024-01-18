import PropTypes from 'prop-types';
import { Loading } from '../components';
import { LayoutConfig } from '../constants';
import { LoginContext } from '../contexts';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthCallback, Example, Home, Login, Register, UsersManager } from '../views';
import { Layout } from './layout';

const AuthRoute = ({ children, redirectTo, parentProps, loginStatus }) => {
  return loginStatus === false ? <Navigate to={redirectTo} {...parentProps} /> : children;
};

AuthRoute.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
  parentProps: PropTypes.any.isRequired,
  loginStatus: PropTypes.bool.isRequired
};

const UnauthRoute = ({ children, redirectTo, parentProps, loginStatus }) => {
  return !loginStatus ? children : <Navigate to={redirectTo} {...parentProps} />;
};

UnauthRoute.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
  parentProps: PropTypes.any.isRequired,
  loginStatus: PropTypes.bool.isRequired
};


export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);
  let landingPage = (LayoutConfig.landingPage !== undefined ? LayoutConfig.landingPage !== '' ? LayoutConfig.landingPage : '/home' : '/home');
  if (loginStatus === undefined) return <Loading />;
  return (
    <Routes>
      <Route exact path='/'
        element={
          <UnauthRoute redirectTo={landingPage} loginStatus={loginStatus} parentProps={props} >
            <Navigate to={{ pathname: '/login' }} {...props} />
          </UnauthRoute>}
      />
      <Route exact path='/auth/callback/:ssoToken'
        element={<UnauthRoute redirectTo={landingPage} loginStatus={loginStatus} parentProps={props}>
          <AuthCallback {...props} />
        </UnauthRoute>}
      />
      <Route exact path='/login'
        element={<UnauthRoute redirectTo={landingPage} loginStatus={loginStatus} parentProps={props}>
          <Login {...props} />
        </UnauthRoute>}
      />
      <Route exact path='/register'
        element={<UnauthRoute redirectTo={landingPage} loginStatus={loginStatus} parentProps={props}>
          <Register {...props} />
        </UnauthRoute>}
      />
      <Route exact path='/home' element={
        <AuthRoute redirectTo='/login' loginStatus={loginStatus} parentProps={props}>
          <Layout><Home {...props} /></Layout>
        </AuthRoute>}
      />
      <Route exact path='/users' element={
        <AuthRoute redirectTo='/login' loginStatus={loginStatus} parentProps={props}>
          <Layout> <UsersManager  {...props} /></Layout>
        </AuthRoute>}
      />

      <Route exact path='/examples' element={
        <AuthRoute redirectTo='/login' loginStatus={loginStatus} parentProps={props}>
          <Layout> <Example  {...props} /></Layout>
        </AuthRoute>}
      />

    </Routes >
  );
};