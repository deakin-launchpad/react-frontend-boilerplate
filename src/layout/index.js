import React, { useContext } from 'react';
import { makeStyles, useMediaQuery, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Header, BottomNavToolbar } from 'components';
import { LayoutConfig } from 'configurations';
import { LayoutContext } from 'contexts';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  header: {
    display: 'flex',
    flex: '0 0 auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  mobileContent: {
    '-webkit-overflow-scrolling': 'touch',
    flexGrow: 1,
    height: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  iOSPadding: {
    height: iOS ? theme.spacing(2) : 0
  },
}));

export const Layout = (props) => {
  const { layoutConfiguration } = useContext(LayoutContext);
  const classes = useStyles();

  let applicationTheme = createMuiTheme({
    palette: {
      primary: {
        main: layoutConfiguration.theme !== undefined ? layoutConfiguration.theme.colors !== undefined ? layoutConfiguration.theme.colors.primary !== undefined ? LayoutConfig.theme.colors.primary : null : null : null
      },
      secondary: {
        main: layoutConfiguration.theme !== undefined ? layoutConfiguration.theme.colors !== undefined ? layoutConfiguration.theme.colors.secondary !== undefined ? layoutConfiguration.theme.colors.secondary : null : null : null
      }
    }
  });

  const headerRenderStatus = () => {
    if (isItDesktop)
      return layoutConfiguration.header.visibleOnDesktop;
    else
      return layoutConfiguration.header.visibleOnMobile;
  };

  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  let content = (
    <MuiThemeProvider theme={applicationTheme} >
      <div className={classes.root}>
        {headerRenderStatus() && <Header />}
        <main className={isItDesktop ? classes.content : classes.mobileContent}>
          <div className={isItDesktop ? classes.appBarSpacer : headerRenderStatus() ? classes.appBarSpacer : null} />
          {props.children}
          <div className={isItDesktop ? null : layoutConfiguration.bottomMobileNavigation ? classes.appBarSpacer : null} />
          <div className={classes.iOSPadding} />
        </main>
        {isItDesktop ? null : layoutConfiguration.bottomMobileNavigation ? <BottomNavToolbar /> : null}
      </div>
    </MuiThemeProvider>
  );
  return content;
};

