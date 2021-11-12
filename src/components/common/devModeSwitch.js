import { useContext, useCallback } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DeveloperConfig } from 'constants/index';
import { LayoutContext, LoginContext } from 'contexts/index';

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
  const { setCurrentTheme } = useContext(LayoutContext);
  const devModeStatusToggle = useCallback(() => {
    setDevMode(current => {
      setCurrentTheme(X => { return { ...X, theme: !current ? 'DARK' : 'LIGHT' }; });
      return !current;
    });
  }, [setDevMode, setCurrentTheme]);
  let content = (
    <FormControlLabel className={classes.devModeToggle}
      control={
        <Switch
          checked={Boolean(devMode)}
          value={Boolean(devMode)}
          onChange={() => { devModeStatusToggle(); }}
        />}
      label={<Typography variant="body1" color="text"     >
        {(DeveloperConfig.label !== undefined ? DeveloperConfig.label : 'God Mode')}
      </Typography>
      }
    />
  );
  return content;
};
