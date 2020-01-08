import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { API, socketAuthCallback } from 'helpers';
import { DevModeConfig, ConnectionConfig } from 'configurations';
import { LoginContext } from 'contexts';


export const LoginCheck = (props) => {
  const { accessToken } = useContext(LoginContext);
  useEffect(() => {
    if (!DevModeConfig.bypassBackend && accessToken)
      if (ConnectionConfig.useAccessTokenVerificationAPI)
        API.accessTokenLogin((response) => {
          if (ConnectionConfig.socket.initSocket)
            if (ConnectionConfig.socket.accessTokenVerification)
              socketAuthCallback(response);
        });
  }, [accessToken]);
  return (<div>{props.children}</div>);
};

LoginCheck.propTypes = {
  children: PropTypes.node.isRequired
};
