/***
 *  Created by Sanchit Dang
 * */

import React, { useEffect, useState } from 'react'
import { Snackbar } from '@material-ui/core'

let OpenNotificationFunction;

/***
 *  Notification is a component which needs to be places in Global App.js or alongside the Routes
 *  notify() is a helper function to trigger Notification Component
 ***/

const Notification = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [verticalPosition, setVerticalPosition] = useState('bottom')
  const [horizontalPosition, setHorizonPosition] = useState('right')
  const openNotification = (newMessage) => {
    setOpen(true)
    setMessage(newMessage)
  };
  const closeNotification = () => {
    setOpen(false)
    setMessage('')
  };
  useEffect(() => {
    OpenNotificationFunction = openNotification
  }, []);
  useEffect(() => {
    if (props.horizontal !== undefined) {
      setHorizonPosition(props.horizontal)
    }
    if (props.vertical !== undefined) {
      setVerticalPosition(props.vertical)
    }
  }, [props]);
  const messageSpan = (<span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: message }} />)
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
  )
  if (message === undefined) return null
  if (message === '') return null
  return content

}

export const notify = (message) => {
  OpenNotificationFunction(message)
}

export default Notification;
