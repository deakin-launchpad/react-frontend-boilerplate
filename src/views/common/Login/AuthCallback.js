import React, { useEffect } from 'react';
import { LoginContext } from 'contexts/index';
import { API } from 'helpers/index';
import { Redirect, withRouter } from 'react-router-dom';
import { LoadingScreen } from 'components/index';

export const AuthCallback = withRouter((props) => {
  const { accessToken, loginStatus, setAccessToken } = React.useContext(LoginContext);
  useEffect(() => {
    (async () => {
      const response = await API.authenticateSSO(props.match.params.ssoToken);
      if (response.success) {
        setAccessToken(response.data.ssoString);
      }
    })();

  }, [props, setAccessToken]);
  if (accessToken === undefined && loginStatus === false) return <LoadingScreen />;
  return <Redirect to='/' />;
});