import { useContext, useCallback } from 'react';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { DeveloperConfig } from '../../constants';
import { LayoutContext, LoginContext } from '../../contexts';


export const DevModeSwitch = () => {
  const { devMode, setDevMode } = useContext(LoginContext);
  const { setCurrentTheme } = useContext(LayoutContext);
  const devModeStatusToggle = useCallback(() => {
    setDevMode(current => {
      setCurrentTheme(X => { return { ...X, theme: !current ? 'DARK' : 'LIGHT' }; });
      return !current;
    });
  }, [setDevMode, setCurrentTheme]);
  let content = (
    <FormControlLabel className='switch-theme'
      control={
        <Switch
          checked={Boolean(devMode)}
          value={Boolean(devMode)}
          onChange={() => { devModeStatusToggle(); }}
        />}
      label={<Typography variant="body1" color="text">
        {(DeveloperConfig.label !== undefined ? DeveloperConfig.label : 'God Mode')}
      </Typography>
      }
    />
  );
  return content;
};
