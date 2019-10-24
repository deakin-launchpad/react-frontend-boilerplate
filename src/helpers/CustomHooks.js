/**
 * Created by Sanchit Dang
 * Helper file for custom hooks
 */

import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey, callback) => {
  /**
  * Custom hook to handleOnKeyPress
  * Example Code : 
  * 
  * useKeyPress('Enter', () => {
  *      perform something cool :) :) 
  * });
  **/

  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);
  if (keyPressed) {
    if (typeof callback === 'function') {
      return callback();
    }
  }

  return keyPressed;
};
