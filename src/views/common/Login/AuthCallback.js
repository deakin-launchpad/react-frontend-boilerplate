import { LoginContext } from 'contexts/index';
import { API } from 'helpers/index';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export const AuthCallback = withRouter((props) => {
  const [state, setState] = React.useState();
  const { setSSOToken } = React.useContext(LoginContext);
  useEffect(() => {
    (async () => {
      const response = await API.authenticateSSO(props.match.params.ssoToken);
      setState(response.data);
    })();

  }, [props, setSSOToken]);

  return <>Auth Callback {JSON.stringify(state)}</>;
});