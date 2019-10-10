import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography, makeStyles, Drawer, Divider, IconButton, useMediaQuery } from '@material-ui/core';
import { LayoutContext } from 'contexts';
import { SideMenuItems } from './SideMenuItems';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { LayoutConfig } from 'configurations';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export const Header = () => {
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  const classes = useStyles();
  const [open, setOpen] = useState(isItDesktop ? (LayoutConfig.sideMenu.default === 'open' ? true : false) : false);
  const { pageTitle, headerElements } = useContext(LayoutContext);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  let content = (
    <>
      <AppBar position={LayoutConfig.sideMenu.permanent ? 'fixed' : 'absolute'} className={LayoutConfig.sideMenu.permanent ? (isItDesktop ? classes.appBarShift : classes.appBar) : clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {isItDesktop ? LayoutConfig.sideMenu.permanent ? null : < IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton> : null}
          {
            headerElements !== null ? headerElements :
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                {pageTitle}
              </Typography>
          }
        </Toolbar>
      </AppBar>
      {
        isItDesktop ? <Drawer
          variant="permanent"
          classes={{
            paper: LayoutConfig.sideMenu.permanent ? classes.drawerPaper : clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={LayoutConfig.sideMenu.permanent ? true : open}
        >
          <div className={classes.toolbarIcon}>
            {LayoutConfig.sideMenu.permanent ? null : <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>}
          </div>
          <Divider />
          <SideMenuItems />
        </Drawer> : null
      }
    </ >
  );
  return content;
};
