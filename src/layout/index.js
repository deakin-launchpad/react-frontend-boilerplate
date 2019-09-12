import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { Header, BottomNavToolbar } from 'components';
import { LayoutConfig } from 'configurations';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
}));

export const Layout = (props) => {
  const classes = useStyles();
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  let content = (
    <div className={classes.root}>
      {isItDesktop ? <Header /> : LayoutConfig.bottomMobileNavigation ? LayoutConfig.displayMobileHeader ? <Header /> : null : <Header />}
      <main className={classes.content}>
        <div className={isItDesktop ? classes.appBarSpacer : LayoutConfig.displayMobileHeader ? classes.appBarSpacer : null} />
        <div className={isItDesktop ? classes.container : LayoutConfig.bottomMobileNavigation ? classes.containerMobile : null}>
          {props.children}
        </div>
        <div className={isItDesktop ? null : LayoutConfig.bottomMobileNavigation ? classes.appBarSpacer : null} />
      </main>
      {isItDesktop ? null : LayoutConfig.bottomMobileNavigation ? <BottomNavToolbar /> : null}
    </div>
  );
  return content;
};

