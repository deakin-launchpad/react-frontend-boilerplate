import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { API, socketAuthCallback } from 'helpers';
import { DevModeConfig, SocketConfig } from 'configurations';
import { LoginContext } from 'contexts';


export const LoginCheck = (props) => {
  const { loginStatus } = useContext(LoginContext);
  useEffect(() => {
    if (!DevModeConfig.bypassBackend && loginStatus)
      API.accessTokenLogin((response) => {
        if (SocketConfig.initSocket)
          if (SocketConfig.accessTokenVerification)
            socketAuthCallback(response);
      });
  }, [loginStatus]);
  return (<div>{props.children}</div>);
};

LoginCheck.propTypes = {
  children: PropTypes.node.isRequired
};
