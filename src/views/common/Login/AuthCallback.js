import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

export const AuthCallback = withRouter((props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return <>Auth Callback</>;
});