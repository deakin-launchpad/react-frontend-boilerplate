/**
 * Created by Sanchit Dang. Updated by Qiaoli Wang.
 */
import { useState, useContext, useCallback } from 'react';
import { Typography, Box, Container, Card, CardContent, Divider, Link } from '@mui/material';
import { LoginContext, DeviceInfoContext, LayoutContext } from '../../contexts';
import { LoginForm, SsoLogin } from '../../components';
import { API } from '../../helpers';
import { ConnectionConfig } from '../../constants';
import { Link as RouterLink } from 'react-router-dom';


export const Login = () => {
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
    if (response?.success) {
      setCurrentUserRole(response.data);
      return true;
    } else return false;
  }, [setCurrentUserRole]);

  let content = (
    <Box className='login-wrapper'  sx={{backgroundColor: 'background.default'}}>
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{p:4}}>
            <Typography color="textPrimary" variant="h4" sx={{mb:2}}>{pageHeading}</Typography>
            <LoginForm login={performLogin} onSuccess={getUserRole} />
            {ConnectionConfig.useDeakinSSO && <Box sx={{ mt: 2 }}><SsoLogin /></Box>}
            <Divider sx={{ my: 3 }} />
            <Link color="textSecondary" component={RouterLink} to="/register" variant="body2">
              Create new account
            </Link>
          </CardContent>
        </Card>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
          Developed by Deakin Launchpad
          </Typography>
        </Box>
      </Container>
    </Box>
  );
  return content;
};
