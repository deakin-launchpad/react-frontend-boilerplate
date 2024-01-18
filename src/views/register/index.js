/**
 * Created by Sanchit Dang. Updated by Qiaoli Wang.
 */
import { useState, useContext } from 'react';
import { TextField, Typography, Button, Box, Divider, Container, Card, CardContent, Link } from '@mui/material';
import { notify } from '../../components';
import { Link as RouterLink } from 'react-router-dom';
import { DeviceInfoContext } from '../../contexts';
import { API } from '../../helpers';


export const Register = () => {
  const { deviceData } = useContext(DeviceInfoContext);
  const [pageHeading] = useState('Register');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const register = () => {
    // TODO : Update Register API
    API.register({
      deviceData,
      emailId,
      password,
      firstName,
      lastName
    });
  };
  const validationCheck = () => {
    if (emailId.length < 0 || password.length < 0 || confirmPassword.length < 0 || firstName.length < 0 || lastName.length < 0
      || emailId === '' || password === '' || confirmPassword === '' || firstName === '' || lastName === '') {
      return notify("Please fill in all the details.");
    }
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailPatternTest = emailPattern.test(emailId);
    if (!emailPatternTest) {
      notify('Email not in proper format');
    }
    if (password !== confirmPassword) {
      return notify("Passwords don't match.");
    }
    if (emailPatternTest) {
      return register();
    }
  };
  let form = (<form noValidate>
    <TextField variant="outlined" margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="email" onChange={e => setFirstName(e.target.value)} autoFocus />
    <TextField variant="outlined" margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="email" onChange={e => setLastName(e.target.value)} />
    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setEmailId(e.target.value)} />
    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
    <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password" />
    <Box sx={{ mt: 2 }}>
      <Button fullWidth variant="contained" color="primary" onClick={validationCheck}>Register</Button>
    </Box>
  </form>);
  let content = (
    <Box className='login-wrapper' sx={{backgroundColor: 'background.default'}}>
      <Container maxWidth="sm">
        <Card>
          <CardContent sx={{p:4}}>
            <Box sx={{pb:2}}>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h4"
              >{pageHeading}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >Register on the internal platform
              </Typography>
            </Box>
            <Box>
              {form}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Link
              color="textSecondary"
              component={RouterLink}
              to="/login"
              variant="body2"
            >
              Having an account
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
