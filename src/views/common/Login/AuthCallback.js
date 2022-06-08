import { LoadingScreen } from 'components/index';
import { DeviceInfoContext, LoginContext } from 'contexts/index';
import { API } from 'helpers/index';
import React, { useContext, useEffect } from 'react';
import { useParams} from 'react-router-dom';

export const AuthCallback =(() => {
  const { accessToken, loginStatus, setAccessToken } = React.useContext(LoginContext);
  const { deviceUUID, deviceName } = useContext(DeviceInfoContext);
  let { ssoToken } = useParams();
  useEffect(() => {
    (async () => {
      if (deviceUUID !== undefined && deviceName !== undefined) {
        const deviceData = {
          deviceType: 'WEB',
          deviceName: deviceName,
          deviceUUID: deviceUUID
        };
        const response = await API.authenticateSSO({ ssoToken: ssoToken, deviceData });
        if (response.success) {
          setAccessToken(response.data.accessToken);
        }
      }
    })();

  }, [setAccessToken, deviceUUID, deviceName, ssoToken]);
  if (accessToken === undefined && loginStatus === false && deviceUUID === undefined && deviceName === undefined) return <LoadingScreen fullScreen />;
  return<LoadingScreen fullScreen />;
});