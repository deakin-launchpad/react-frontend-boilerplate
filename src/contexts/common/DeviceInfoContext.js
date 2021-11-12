import { LoadingScreen } from 'components/index';
import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { deviceDetect } from 'react-device-detect';
import { v4, validate } from 'uuid';

export const DeviceInfoContext = createContext();

export const DeviceInfoProvider = (props) => {
  const [deviceUUID, setDeviceUUID] = useState();
  const [deviceInfo, setDeviceInfo] = useState();
  useEffect(() => {
    const string = window.localStorage.getItem('uuid');
    if (!validate(string)) {
      let newUUID = v4();
      window.localStorage.setItem('uuid', newUUID);
      setDeviceUUID(newUUID);
    }
    else setDeviceUUID(string);
    setDeviceInfo(deviceDetect());
  }, []);

  const deviceData = useMemo(() => {
    if (deviceInfo === undefined || deviceUUID === undefined) return undefined;
    return {
      deviceType: 'WEB',
      deviceName: `${deviceInfo.browserName} ${deviceInfo.browserMajorVersion} on ${deviceInfo.osName} ${deviceInfo.osVersion}`,
      deviceUUID: deviceUUID + ''
    };
  }, [deviceUUID, deviceInfo]);

  if (deviceUUID === undefined || deviceInfo === undefined)
    return <LoadingScreen loadingText='loading device info' />;

  return <DeviceInfoContext.Provider value={{
    deviceData,
    deviceUUID, deviceInfo,
    deviceName: `${deviceInfo.browserName} ${deviceInfo.browserMajorVersion} on ${deviceInfo.osName} ${deviceInfo.osVersion}`
  }} >{props.children}</DeviceInfoContext.Provider>;
};

DeviceInfoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

