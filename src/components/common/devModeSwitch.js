import { useContext, useCallback } from 'react';
import { FormControlLabel, Switch, Typography, GlobalStyles, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DeveloperConfig } from 'constants/index';
import { LayoutContext, LoginContext } from 'contexts/index';

const DevModeToggleBox = styled(Box)({
  position: 'fixed',
  bottom: DeveloperConfig.verticlePosition === 'top' ? '94vh' : '2vh',
  right: DeveloperConfig.horizontalPosition === 'right' ? '1vw' : '64vw',
  zIndex: 99999,
  opacity: 0.8,
});

export const DevModeSwitch = () => {
  const { devMode, setDevMode } = useContext(LoginContext);
  const { setCurrentTheme } = useContext(LayoutContext);

  const devModeStatusToggle = useCallback(() => {
    setDevMode(current => {
      setCurrentTheme(prev => ({ ...prev, theme: !current ? 'DARK' : 'LIGHT' }));
      return !current;
    });
  }, [setDevMode, setCurrentTheme]);

  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: theme => theme.palette.common.dark } }} />
      <DevModeToggleBox>
        <FormControlLabel
          control={
            <Switch
              checked={Boolean(devMode)}
              value={Boolean(devMode)}
              onChange={devModeStatusToggle}
            />
          }
          label={
            <Typography variant="body1" color="text.primary">
              {DeveloperConfig.label ?? 'God Mode'}
            </Typography>
          }
        />
      </DevModeToggleBox>
    </>
  );
};