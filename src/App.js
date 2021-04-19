/***
 *  Created by Sanchit Dang
 ***/
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './helpers/database/idb';
import { MuiThemeProvider } from '@material-ui/core';
import { AppRoutes } from './bricks/index';
import { ContextManager } from 'contexts';
import { Notification, DevModeSwitch, LoginCheck, GlobalStyles } from 'components';
import { DeveloperConfig, THEMES } from 'constants/index';
import { createTheme } from 'theme/index';

const App = (props) => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);
  let applicationTheme = createTheme({
    compact: false,
    direction: 'ltr',
    responsiveFontSizes: true,
    roundedCorners: true, 
    theme: THEMES.LIGHT
  });
  return (
    <ContextManager>
      <LoginCheck>
        <MuiThemeProvider theme={applicationTheme} >
          <AppRoutes {...props} />
        </MuiThemeProvider>
        <GlobalStyles />
        {DeveloperConfig.visible ? <DevModeSwitch /> : ''}
        <Notification />
      </LoginCheck>
    </ContextManager>
  );
};

export default withRouter(App);
