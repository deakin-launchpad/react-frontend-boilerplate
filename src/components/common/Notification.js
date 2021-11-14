/***
 *  Created by Sanchit Dang
 * */

import { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';

let OpenNotificationFunction;

/***
 *  Notification is a component which needs to be places in Global App.js or alongside the Routes
 *  DisplayBrowserNotification triggers browser notification
 *  notify() is a helper function to trigger Notification Component
 *  @notify params are message, callback, variant
 ***/

const EnhancedNotification = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [verticalPosition, setVerticalPosition] = useState('bottom');
  const [horizontalPosition, setHorizonPosition] = useState('right');
  const openNotification = (newMessage) => {
    setOpen(true);
    setMessage(newMessage);
  };
  const closeNotification = () => {
    setOpen(false);
    setMessage('');
  };
  useEffect(() => {
    OpenNotificationFunction = openNotification;
  }, []);
  useEffect(() => {
    if (props.horizontal !== undefined) {
      setHorizonPosition(props.horizontal);
    }
    if (props.vertical !== undefined) {
      setVerticalPosition(props.vertical);
    }
  }, [props]);
  const messageSpan = (<span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: message }} />);
  const content = (
    <Snackbar
      anchorOrigin={{ vertical: verticalPosition, horizontal: horizontalPosition }}
      message={messageSpan}
      autoHideDuration={3000}
      onClose={closeNotification}
      open={open}
      ContentProps={{
        'aria-describedby': 'snackbar-message-id',
      }}
    />
  );
  if (message === undefined) return null;
  if (message === '') return null;
  return content;
};

export const DisplayBrowserNotification = (message) => {
  if (!('Notification' in window)) {
    alert(message);
  }
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    new Notification(message);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification(message);
      }
    });
  }
};

export const notify = (message, callback, variant) => {
  if (variant === 'browser')
    DisplayBrowserNotification(message);
  else if (variant === 'both') {
    OpenNotificationFunction(message);
    DisplayBrowserNotification(message);
  } else
    OpenNotificationFunction(message);
  if (typeof callback === 'function')
    callback();
};


export default EnhancedNotification;
