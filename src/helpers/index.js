import { axiosInstance } from './API/axiosInstance';
import API from './API/api.js';
import { useKeyPress, useLocalStorage, useGeoLocation } from './hooks';
import { socketInstance, useSocket, socketAuthCallback } from './socket';
import { LoginCheck } from './login/LoginCheck';
export {
  axiosInstance,
  API,
  useKeyPress,
  useLocalStorage,
  useGeoLocation,
  socketInstance,
  useSocket,
  socketAuthCallback,
  LoginCheck
};
