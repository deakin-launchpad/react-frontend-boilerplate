/***
 *  Created by Sanchit Dang
 ***/
import { useState, useContext } from 'react';
import { TextField, Typography, Button, Box, Divider, Container, Card, CardContent, Link } from '@mui/material';
import { notify } from 'components';
import { Link as RouterLink } from 'react-router-dom';
import { DeviceInfoContext } from 'contexts/index';
import { API } from 'helpers/index';


export const Register = () => {
  const { deviceData } = useContext(DeviceInfoContext);
  const [pageHeading] = useState('Register');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const register = () => {
    // Process the phone number by removing the first 0
    let processedPhoneNumber = phoneNumber.replace(/^0/, '');
    API.register({
      deviceData,
      emailId,
      password,
      firstName,
      lastName,
      phoneNumber: processedPhoneNumber
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
    if (phoneNumber.length < 0 || phoneNumber === '') {
      return notify("Please fill in all the details.");
    }
    if (phoneNumber.length !== 10 || !phoneNumber.startsWith('04')) {
      return notify("Phone number must be 10 digits. Starting with 04");
    }
  };
  let form = (<form noValidate>
    <TextField variant="outlined" margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="email" onChange={e => setFirstName(e.target.value)} autoFocus />
    <TextField variant="outlined" margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="email" onChange={e => setLastName(e.target.value)} />
    <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setEmailId(e.target.value)} />
    <TextField variant="outlined" margin="normal" required fullWidth id="phoneNumber" label="Phone Number" name="phoneNumber" autoComplete="phoneNumber" onChange={e => setPhoneNumber(e.target.value)} />
    <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} />
    <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
    <Box sx={{ mt: 2 }}>
      <Button fullWidth variant="contained" color="primary" onClick={validationCheck}>Register</Button>
    </Box>
  </form>);
  let content = (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ py: '80px' }}
      >
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 4
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3
              }}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h4"
                >
                  {pageHeading}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Register
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
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
      </Container>
      {/* <Box mt={2}>
        <Typography sx={{
          paddingBottom: '4vh',
          margin: 'auto',
          width: '100%'
        }} variant="body2" color="textSecondary" align="center">
          Developed by Deakin Launchpad
        </Typography>
      </Box> */}
    </Box>

  );
  return content;
};
