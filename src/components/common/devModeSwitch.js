import React, { useContext } from 'react'
import { LoginContext } from 'contexts'
import { FormControlLabel, Switch, makeStyles } from '@material-ui/core'
import { DevModeConfig } from 'configurations'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.dark,
    },
  },
  devModeToggle: {
    position: 'fixed',
    bottom: (DevModeConfig.verticlePosition === 'top' ? '94vh' : '2vh'),
    right: (DevModeConfig.horizontalPosition === 'right' ? '1vw' : '64vw'),
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
  }
  let content = (
    <FormControlLabel className={classes.devModeToggle}
      control={
        <Switch checked={Boolean(devMode)} value={Boolean(devMode)} onChange={() => { devModeStatusToggle(); }} />}
      label={(DevModeConfig.label !== undefined ? DevModeConfig.label : 'God Mode')}
    />
  );
  return content;
};
