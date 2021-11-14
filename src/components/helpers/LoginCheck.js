import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { API, socketAuthCallback } from 'helpers';
import { ConnectionConfig } from 'constants/index';
import { LoginContext, LayoutContext } from 'contexts';

export const LoginCheck = (props) => {
  const { accessToken } = useContext(LoginContext);
  const { setCurrentUserRole } = useContext(LayoutContext);
  useEffect(() => {
    if (!ConnectionConfig.bypassBackend && accessToken) {
      if (ConnectionConfig.useAccessTokenVerificationAPI) {
        (async () => {
          let apiResponse = await API.accessTokenLogin();
          if (apiResponse.success) {
            if (ConnectionConfig.socket.initSocket)
              if (ConnectionConfig.socket.accessTokenVerification)
                socketAuthCallback(apiResponse.data);
          }
        })();
      }
      if (ConnectionConfig.useACL && accessToken) {
        (async () => {
          const response = await API.getUserRole();
          if (response.success) {
            setCurrentUserRole(response.data);
          }
        })();
      }
    }
  }, [accessToken, setCurrentUserRole]);
  return (<div>{props.children}</div>);
};

LoginCheck.propTypes = {
  children: PropTypes.node.isRequired
};
