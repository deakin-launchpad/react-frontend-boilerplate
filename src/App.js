/***
 *  Created by Sanchit Dang
 ***/
import { useEffect } from 'react';
import './helpers/database/idb';
import { AppRoutes } from './bricks/index';
import { ContextManager } from 'contexts';
import { Notification, DevModeSwitch, LoginCheck, GlobalStyles } from 'components';
import { DeveloperConfig } from 'constants/index';
import { ThemeProvider } from 'theme';

const App = (props) => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);
  return (
    <ContextManager>
      <ThemeProvider>
        <LoginCheck>
          <AppRoutes {...props} />
          <GlobalStyles />
          {DeveloperConfig.visible ? <DevModeSwitch /> : ''}
          <Notification />
        </LoginCheck>
      </ThemeProvider>
    </ContextManager>
  );
};

export default App;
