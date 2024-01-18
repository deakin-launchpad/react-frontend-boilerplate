import { useEffect } from 'react';
import { AppRoutes } from './bricks';
import { ContextManager } from './contexts';
import { Notification, DevModeSwitch } from './components';
import { LoginCheck } from './helpers';
import { DeveloperConfig } from './constants';
import { ThemeProvider} from './theme';


const App = (props) => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);
  return (
    <ContextManager>
      <ThemeProvider>
        <LoginCheck>
          <AppRoutes {...props} />
          {DeveloperConfig.visible ? <DevModeSwitch /> : ''}
          <Notification />
        </LoginCheck>
      </ThemeProvider>
    </ContextManager>
  );
};

export default App;