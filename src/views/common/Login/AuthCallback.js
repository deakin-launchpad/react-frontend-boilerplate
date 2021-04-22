import React, { useEffect, useContext } from 'react';
import { LoginContext, DeviceInfoContext } from 'contexts/index';
import { API } from 'helpers/index';
import { Redirect, withRouter } from 'react-router-dom';
import { LoadingScreen } from 'components/index';

export const AuthCallback = withRouter((props) => {
  const { accessToken, loginStatus, setAccessToken } = React.useContext(LoginContext);
  const { deviceUUID, deviceName } = useContext(DeviceInfoContext);

  useEffect(() => {
    (async () => {
      if (deviceUUID !== undefined && deviceName !== undefined) {
        const deviceData = {
          deviceType: 'WEB',
          deviceName: deviceName,
          deviceUUID: deviceUUID
        };
        const response = await API.authenticateSSO({ ssoToken: props.match.params.ssoToken, deviceData });
        if (response.success) {
          setAccessToken(response.data.accessToken);
        }
      }
    })();

  }, [props, setAccessToken, deviceUUID, deviceName]);
  if (accessToken === undefined && loginStatus === false && deviceUUID === undefined && deviceName === undefined) return <LoadingScreen />;
  return <Redirect to='/' />;
});