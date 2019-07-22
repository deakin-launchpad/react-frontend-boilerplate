/***
 *  Created by Sanchit Dang
 ***/
import React, { useEffect } from 'react';
import './styles/App.scss';
import './database/idb'
import { CssBaseline, Container } from '@material-ui/core'
import { AppRoutes } from './routes/routes';
import { ContextManager } from 'contexts'
import { Notification } from 'components'


const App = () => {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);
  return (
    <ContextManager>
      <Container maxWidth="lg">
        <CssBaseline />
        <AppRoutes />
        <Notification />
      </Container>
    </ContextManager>
  );
}

export default App;
