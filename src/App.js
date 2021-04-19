/***
 *  Created by Sanchit Dang
 ***/
import React, { useEffect } from 'react';
import './styles/App.scss';
import { withRouter } from 'react-router-dom';
import './helpers/database/idb';

import { AppRoutes } from './bricks/index';
import { ContextManager } from 'contexts';
import { Notification, DevModeSwitch, LoginCheck } from 'components';
import { DeveloperConfig } from 'constants/index';


const App = (props) => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);
  return (
    <ContextManager>
      <LoginCheck>
        <AppRoutes {...props} />
        {DeveloperConfig.visible ? <DevModeSwitch /> : ''}
        <Notification />
      </LoginCheck>
    </ContextManager>
  );
};

export default withRouter(App);
