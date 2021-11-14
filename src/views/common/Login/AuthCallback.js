import { useEffect, useContext } from 'react';
import { LoginContext, DeviceInfoContext } from 'contexts/index';
import { API } from 'helpers/index';
import { Navigate, useParams } from 'react-router-dom';
import { LoadingScreen } from 'components/index';

export const AuthCallback = () => {
  const { accessToken, loginStatus, setAccessToken } = useContext(LoginContext);
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

  }, [ssoToken, setAccessToken, deviceUUID, deviceName]);
  if (accessToken === undefined && loginStatus === false && deviceUUID === undefined && deviceName === undefined) return <LoadingScreen />;
  return <Navigate to='/' />;
};