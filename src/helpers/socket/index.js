import io from 'socket.io-client';
import { ConnectionConfig, DeveloperConfig } from 'constants/index';
import { useSocket } from './service';
import { socketAuthCallback } from './util';

export var socketInstance = null;

const initSocket = () => {
  if (socketInstance === null) {
    socketInstance = io(process.env.REACT_APP_BASE_URL, ConnectionConfig.socket.socketDefaultOptions);
    if (socketInstance) {
      if (DeveloperConfig.visible)
        console.log('socketClient initilized');
      return socketInstance;
    }
  } else if (DeveloperConfig.visible) console.log('SocketClient Already Initilized');
};
if (ConnectionConfig.socket.initSocket)
  initSocket();

export {
  useSocket,
  socketAuthCallback
};
