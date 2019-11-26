import { API } from 'helpers';
import { DevModeConfig, SocketConfig } from 'configurations';
import { socketInstance } from './index';

const socketAuthCallback = (response) => {
  socketInstance.emit('authenticate', response);
};

export const checkLoginStatus = () => {
  if (!DevModeConfig.bypassBackend && SocketConfig.initSocket)
    API.accessTokenLogin((response) => {
      if (SocketConfig.accessTokenVerification)
        socketAuthCallback(response);
    });
};
