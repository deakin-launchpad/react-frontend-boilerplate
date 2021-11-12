/***
 *  Created by Sanchit Dang
 ***/
import { useState, useContext, useCallback } from 'react';
import { Typography, Box, Container, Card, CardContent, Divider, Link } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { LoginContext, DeviceInfoContext, LayoutContext } from 'contexts';
import { LoginForm, SsoLogin } from 'components';
import { API } from 'helpers';
import { ConnectionConfig } from 'constants/index';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => createStyles({
  developMessage: {
    position: 'absolute',
    bottom: '2vh',
    margin: 'auto',
    width: '100%'
  }
}));

export const Login = () => {
  const classes = useStyles();
  const [pageHeading] = useState('Login');
  const { setAccessToken } = useContext(LoginContext);
  const { deviceUUID, deviceName } = useContext(DeviceInfoContext);
  const { setCurrentUserRole } = useContext(LayoutContext);

  const performLogin = useCallback(async (loginValues) => {
    if (ConnectionConfig.bypassBackend) {
      setAccessToken('dummyToken');

    } else {
      let details = {
        ...loginValues, deviceData: {
          deviceType: 'WEB',
          deviceName: deviceName,
          deviceUUID: deviceUUID
        }
      };
      return API.login(details);
    }
  }, [setAccessToken, deviceUUID, deviceName]);

  const getUserRole = useCallback(async () => {
    const response = await API.getUserRole();
    if (response.success) {
      setCurrentUserRole(response.data);
      return true;
    } else return false;
  }, [setCurrentUserRole]);

  let content = (
    <Box sx={{
      backgroundColor: 'background.default',
      display: 'flex', flexDirection: 'column',
      minHeight: '100vh'
    }} >
      <Container maxWidth="sm" sx={{
        py: {
          xs: '80px',
          sm: window.screen.availHeight / 50
        }
      }}  >
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', p: 4 }} >
            <Box sx={{
              alignItems: 'center', display: 'flex', justifyContent: 'space-between', mb: 3,
            }}>
              <div>
                <Typography color="textPrimary" variant="h4" >
                  {pageHeading}
                </Typography>
              </div>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 3 }} >
              <LoginForm login={performLogin} onSuccess={getUserRole} />
            </Box>
            {ConnectionConfig.useDeakinSSO && <Box sx={{ mt: 2 }}>
              <SsoLogin />
            </Box>}
            <Divider sx={{ my: 3 }} />
            <Link
              color="textSecondary"
              component={RouterLink}
              to="/register"
              variant="body2"
            >
              Create new account
            </Link>
          </CardContent>
        </Card>
      </Container>
      <Box mt={5}>
        <Typography className={classes.developMessage} variant="body2" color="textSecondary" align="center">
          Developed by Deakin Launchpad
        </Typography>
      </Box>
    </Box>
  );
  return content;
};
