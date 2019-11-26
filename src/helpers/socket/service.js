
import { useState, useEffect } from 'react';
import { socketInstance } from './index';


export const useSocket = (variant, event, callback) => {
  /**
   * A custom hook to socket.io client
   * Example Code: useSocket('variant', 'event', (response) => {
   *  perform something cool
   *  });
   */
  const [error, _setError] = useState(null);
  const setError = (error) => {
    console.log(error);
    _setError(error);
  };
  useEffect(() => {
    if (socketInstance === null)
      setError('Socket not initilized! Check Configuration to enable it.');
    if (String(variant).toLowerCase() !== 'on' && String(variant).toLowerCase() !== 'emit' && String(variant).toLowerCase() !== 'off')
      setError('Unsupported Variant Provided! Please use one of "on" "emit" or "off"');
    else {
      if (event === null || event === '')
        setError('Event Required!');
      else if (typeof event !== 'string')
        setError('Event not string');
      else {
        if (callback instanceof Function)
          socketInstance[variant](event, (response) => callback(response));
        else {
          socketInstance[variant](event);
        }
      }
    }
  }, [variant, event, callback]);
  if (error) {
    return [null, { error: error }];
  }
  if (socketInstance === null) {
    return [null, { error: error }];
  }
  return [socketInstance, null];
};
