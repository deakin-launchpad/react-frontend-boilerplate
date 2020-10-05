/***
 *  Created by Sanchit Dang
 ***/
import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Paper, makeStyles, Typography, Button, Box, Grid } from '@material-ui/core';
import { LoginContext } from 'contexts';
import { notify } from 'components';
import { DevModeConfig } from 'configurations';
import { API, useKeyPress, TextHelper } from 'helpers';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginBox: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(10)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    marginTop: theme.spacing(1)
  },
  developMessage: {
    position: 'absolute',
    bottom: '2vh'
  }
}));

export const Login = () => {
  const classes = useStyles();
  const [pageHeading] = useState('Login');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const { devMode, loginStatus, setAccessToken } = useContext(LoginContext);

  const performLogin = useCallback(() => {
    if (DevModeConfig.bypassBackend) {
      setAccessToken('dummyToken');
    } else {
      let details = {
        username: (devMode ? (DevModeConfig.devDetails !== undefined ? DevModeConfig.devDetails.user : '') : emailId),
        password: (devMode ? (DevModeConfig.devDetails !== undefined ? DevModeConfig.devDetails.password : '') : password)
      };
      let apiResponse = API.login(details);
      if (apiResponse.success) {
        setAccessToken(apiResponse.data);
      }
    }
  }, [devMode, emailId, password, setAccessToken]);

  const validationCheck = useCallback(() => {
    if (devMode) {
      return performLogin();
    }
    if (!loginStatus) {
      const emailValidationResult = TextHelper.validateEmail(emailId);
      if (emailValidationResult && password) {
        performLogin();
        return true;
      } else if (emailId === "" && password === "") {
        notify('Email and password must not be empty!');
        return false;
      } else if (emailId) {
        notify('Email must not be empty!');
        return false;
      } else if (!emailValidationResult && emailId.length > 0) {
        notify('Invalid email!');
        return false;
      } else if (!password) {
        notify('Password must not be empty!');
        return false;
      }
    }
  }, [devMode, emailId, loginStatus, password, performLogin]);

  useKeyPress('Enter', () => {
    validationCheck();
  });

  let content = (
    <div>
      <Grid container spacing={0} justify="center">
        <Grid className={classes.loginBox} item xs={10} sm={6} md={4} lg={3} xl={2}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              {pageHeading}
            </Typography>
            <form noValidate>
              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setEmailId(e.target.value)} autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
              <Button fullWidth variant="contained" color="primary" className={classes.buttons} onClick={validationCheck}>Login</Button>
              <Button fullWidth variant="contained" color="primary" className={classes.buttons} component={Link} to='/register'>Sign Up</Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.developMessage}>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              Developed by Deakin Launchpad
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
  return content;
};
