/***
 *  Created by Sanchit Dang
 ***/
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
/**
 * @AccessToken 
 * @LoginStatus 
 * @DevMode 
 * can be used by VanilaJS to check respective status 
 * @logout : function to logout user
 */

export var AccessToken = localStorage.getItem('accessToken');
export var SSOToken = localStorage.getItem('ssoToken');
export var LoginStatus = (localStorage.getItem('loginStatus') === true ? true : undefined);
export var DevMode = (localStorage.getItem('devMode') === true ? true : undefined);
let logoutFunction;
export const logout = async (init) => {
  if (init !== undefined)
    await init();
  logoutFunction();
};

export const LoginContext = createContext();
export const LoginProvider = props => {
  const { children } = props;
  const [devMode, _setDevMode] = useState((DevMode !== '' ? DevMode : false));
  const [loginStatus, _setLoginStatus] = useState(LoginStatus);
  const [accessToken, _setAccessToken] = useState(AccessToken);
  const [ssoToken, _setSSOToken] = useState(SSOToken);

  /**
  * Functions 
  * 
  * setLoginStatus()
  * setDevMode()
  * setAccessToken() 
  * 
  * are wrapperfunctions which changes respective values in localStorage, Context and VanilaJS Global Variables 
  */

  const setLoginStatus = (data) => {
    if (data === true) {
      window.localStorage.setItem('loginStatus', true);
      LoginStatus = true;
      _setLoginStatus(true);
    } else {
      window.localStorage.setItem('loginStatus', false);
      LoginStatus = false;
      _setLoginStatus(false);
    }
  };

  const logoutUser = async (init) => {
    if (init instanceof Function) {
      init();
    }
    window.localStorage.setItem('loginStatus', false);
    LoginStatus = false;
    _setLoginStatus(false);
  };
  useEffect(() => {
    logoutFunction = logoutUser;
  }, []);
  const setDevMode = (data) => {
    window.localStorage.setItem('devMode', data);
    DevMode = data;
    _setDevMode(data);
  };
  const setAccessToken = (data) => {
    AccessToken = data;
    window.localStorage.setItem('accessToken', data);
    _setAccessToken(data);
  };

  const setSSOToken = (data) => {
    SSOToken = data;
    window.localStorage.setItem('ssoToken', data);
    _setSSOToken(data);
  };
  useEffect(() => {
    if (accessToken !== undefined || ssoToken !== undefined)
      if (accessToken !== null || ssoToken !== null)
        if (accessToken || ssoToken) {
          setLoginStatus(true);
          setAccessToken(accessToken);
        } else {
          setLoginStatus(false);
        }
  }, [accessToken, ssoToken]);
  useEffect(() => {
    if (loginStatus !== undefined)
      if (loginStatus !== null)
        if (!loginStatus)
          setAccessToken('');
  }, [loginStatus]);
  useEffect(() => {
    if (DevMode !== undefined)
      if (DevMode !== 'true')
        _setDevMode(false);
  }, []);
  useEffect(() => {
    if (!accessToken && !ssoToken) {
      setLoginStatus(false);
    }
  }, [devMode, accessToken, ssoToken]);
  return (<LoginContext.Provider value={{
    loginStatus,
    accessToken,
    devMode,
    setAccessToken,
    setLoginStatus,
    setDevMode,
    ssoToken,
    setSSOToken
  }}>{children}</LoginContext.Provider>);
};

LoginProvider.propTypes = {
  children: PropTypes.node
};
