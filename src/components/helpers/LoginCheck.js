import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { API, socketAuthCallback } from 'helpers';
import { DevModeConfig, SocketConfig } from 'configurations';
import { LoginContext } from 'contexts';


export const LoginCheck = (props) => {
  const { accessToken } = useContext(LoginContext);
  useEffect(() => {
    if (!DevModeConfig.bypassBackend && accessToken)
      API.accessTokenLogin((response) => {
        if (SocketConfig.initSocket)
          if (SocketConfig.accessTokenVerification)
            socketAuthCallback(response);
      });
  }, [accessToken]);
  return (<div>{props.children}</div>);
};

LoginCheck.propTypes = {
  children: PropTypes.node.isRequired
};
