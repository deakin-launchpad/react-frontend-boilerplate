/***
 *  Created by Sanchit Dang
 ***/
import React, { useEffect } from 'react';
import './styles/App.scss';
import { withRouter } from 'react-router-dom';
import './database/idb';
import { CssBaseline } from '@material-ui/core'
import { AppRoutes } from './routes/routes';
import { ContextManager } from 'contexts';
import { Notification, DevModeSwitch } from 'components';
import { DevModeConfig } from 'configurations';

const App = (props) => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);
  return (
    <ContextManager>
      <CssBaseline />
      <AppRoutes {...props} />
      {DevModeConfig.visible ? <DevModeSwitch /> : ''}
      <Notification />
    </ContextManager>
  );
}

export default withRouter(App);
