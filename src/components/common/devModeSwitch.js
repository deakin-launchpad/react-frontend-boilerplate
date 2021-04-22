import React, { useContext } from 'react';
import { LoginContext } from 'contexts';
import { FormControlLabel, Switch, makeStyles, Typography } from '@material-ui/core';
import { DeveloperConfig } from 'constants/index';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  devModeToggle: {
    position: 'fixed',
    bottom: (DeveloperConfig.verticlePosition === 'top' ? '94vh' : '2vh'),
    right: (DeveloperConfig.horizontalPosition === 'right' ? '1vw' : '64vw'),
    zIndex: 99999,
    opacity: 0.8
  }
}));

export const DevModeSwitch = () => {
  const classes = useStyles();
  const { devMode, setDevMode } = useContext(LoginContext);
  const devModeStatusToggle = () => {
    if (devMode)
      setDevMode(false);
    else
      setDevMode(true);
  };
  let content = (
    <FormControlLabel className={classes.devModeToggle}
      control={
        <Switch
          checked={Boolean(devMode)}
          value={Boolean(devMode)}
          onChange={() => { devModeStatusToggle(); }}
        />}
      label={<Typography variant="body1" color="textSecondary"     >
        {(DeveloperConfig.label !== undefined ? DeveloperConfig.label : 'God Mode')}
      </Typography>
      }
    />
  );
  return content;
};
