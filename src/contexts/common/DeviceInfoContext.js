import React from 'react';
import PropTypes from 'prop-types';
import { LoadingScreen } from 'components/index';
import { validate, v4 } from 'uuid';


export const DeviceInfoContext = React.createContext();

export const DeviceInfoProvider = (props) => {
  const [deviceUUID, setDeviceUUID] = React.useState();
  React.useEffect(() => {
    const string = window.localStorage.getItem('uuid');
    if (!validate(string)) {
      let newUUID = v4();
      window.localStorage.setItem('uuid', newUUID);
      setDeviceUUID(newUUID);
    }
    else setDeviceUUID(string);
  }, []);

  if (deviceUUID === undefined) return <LoadingScreen loadingText='loading device info' />;

  return <DeviceInfoContext.Provider value={{ deviceUUID }} >{props.children}</DeviceInfoContext.Provider>;
};

DeviceInfoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

