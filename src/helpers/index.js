import { axiosInstance } from './API/axiosInstance';
import API from './API/api.js';
import TextHelper from './data/TextHelper';
import OutputHelper from './data/OutputHelper';
import { useKeyPress, useLocalStorage, useLocation } from './hooks';
import { socketInstance, useSocket, socketAuthCallback } from './socket';
export {
  axiosInstance,
  API,
  TextHelper,
  OutputHelper,
  useKeyPress,
  useLocalStorage,
  useLocation,
  socketInstance,
  useSocket,
  socketAuthCallback
};
