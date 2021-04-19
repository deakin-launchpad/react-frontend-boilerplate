import { socketInstance } from './index';

export const socketAuthCallback = (response) => {
  socketInstance.emit('authenticate', response);
};
