/**
 * Created by Sanchit Dang. Updated by Qiaoli Wang.
 */

import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * @AccessToken 
 * @LoginStatus 
 * @DevMode 
 * can be used by VanillaJS to check respective status 
 * @logout : function to logout user
 */

export let AccessToken = localStorage.getItem('accessToken');
export let LoginStatus = (localStorage.getItem('loginStatus') === true ? true : undefined);
export let DevMode = (localStorage.getItem('devMode') === true ? true : undefined);

let logoutFunction;
export const logout = async (init) => {
  if (init !== undefined)
    await init();
  logoutFunction();
};

export const LoginContext = createContext();
export const LoginProvider = props => {
  const { children } = props;
  const [devMode, setDevMode] = useState((DevMode !== '' ? DevMode : false));
  const [loginStatus, setLoginStatus] = useState(LoginStatus);
  const [accessToken, setAccessToken] = useState(AccessToken);

  /**
  * Functions 
  * 
  * setLoginStatus()
  * setDevMode()
  * setAccessToken() 
  * 
  * are wrapper functions which changes respective values in localStorage, Context and VanillaJS Global Variables 
  */

  const handleLoginStatusChange = (data) => {
    if (data === true) {
      window.localStorage.setItem('loginStatus', true);
      LoginStatus = true;
      setLoginStatus(true);
    } else {
      window.localStorage.setItem('loginStatus', false);
      LoginStatus = false;
      setLoginStatus(false);
    }
  };
  const logoutUser = async (init) => {
    if (init instanceof Function) {
      init();
    }
    window.localStorage.clear();
    LoginStatus = false;
    setLoginStatus(false);
  };
  useEffect(() => {
    logoutFunction = logoutUser;
  }, []);

  const handleDevModeChange = (data) => {
    window.localStorage.setItem('devMode', data);
    DevMode = data;
    setDevMode(data);
  };

  const handleAccessTokenChange = useCallback((data) => {
    AccessToken = data;
    window.localStorage.setItem('accessToken', data);
    setAccessToken(data);
  }, [setAccessToken]);




  useEffect(() => {
    if (accessToken !== undefined)
      if (accessToken !== null)
        if (accessToken) {
          handleLoginStatusChange(true);
          handleAccessTokenChange(accessToken);
        } else {
          handleLoginStatusChange(false);
        }
  }, [accessToken, handleAccessTokenChange]);

  useEffect(() => {
    if (loginStatus !== undefined)
      if (loginStatus !== null)
        if (!loginStatus)
          handleAccessTokenChange('');
  }, [loginStatus, handleAccessTokenChange]);

  useEffect(() => {
    if (DevMode !== undefined)
      if (DevMode !== 'true')
        setDevMode(false);
  }, []);

  useEffect(() => {
    if (!accessToken) {
      handleLoginStatusChange(false);
    }
  }, [devMode, accessToken]);


  return (<LoginContext.Provider value={{
    loginStatus,
    accessToken,
    devMode,
    setAccessToken: handleAccessTokenChange,
    setLoginStatus: handleLoginStatusChange,
    setDevMode: handleDevModeChange,
  }}>{children}</LoginContext.Provider>);
};

LoginProvider.propTypes = {
  children: PropTypes.node
};