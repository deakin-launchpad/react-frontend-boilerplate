import io from 'socket.io-client';
import { ConnectionConfig, DevModeConfig } from 'configurations';
import { useSocket } from './service';
import { socketAuthCallback } from './util';

export var socketInstance = null;

const initSocket = () => {
  if (socketInstance === null) {
    socketInstance = io(process.env.REACT_APP_BASE_URL, ConnectionConfig.socket.socketDefaultOptions);
    if (socketInstance) {
      if (DevModeConfig.visible)
        console.log('socketClient initilized');
      return socketInstance;
    }
  } else if (DevModeConfig.visible) console.log('SocketClient Already Initilized');
};
if (ConnectionConfig.socket.initSocket)
  initSocket();

export {
  useSocket,
  socketAuthCallback
};
