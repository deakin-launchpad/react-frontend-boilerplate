import { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Drawer, Divider, IconButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LayoutContext } from 'contexts';
import { SideMenuItems } from './SideMenuItems';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'permanent' && prop !== 'isItDesktop'
})(({ theme, open, permanent, isItDesktop }) => {
  const baseStyles = {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };

  const shiftStyles = {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };

  if (permanent) {
    return isItDesktop ? { ...baseStyles, ...shiftStyles } : baseStyles;
  } else {
    return open ? { ...baseStyles, ...shiftStyles } : baseStyles;
  }
});

const ToolbarIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 8px',
  ...theme.mixins.toolbar,
}));

const DrawerPaper = styled('div')(({ theme }) => ({
  position: 'relative',
  whiteSpace: 'nowrap',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const DrawerPaperClose = styled(DrawerPaper)(({ theme }) => ({
  overflowX: 'hidden',
  width: theme.spacing(6),
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(7.9),
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const Header = () => {
  const isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  const { pageTitle, headerElements, layoutConfiguration } = useContext(LayoutContext);
  const [open, setOpen] = useState(isItDesktop && layoutConfiguration.sideMenu.default === 'open');

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      <StyledAppBar
        position={layoutConfiguration.sideMenu.permanent ? 'fixed' : 'absolute'}
        open={open}
        permanent={layoutConfiguration.sideMenu.permanent}
        isItDesktop={isItDesktop}
        elevation={layoutConfiguration?.theme?.appBarElevation ?? 1}
        color={layoutConfiguration.header.useCustomColor ? undefined : layoutConfiguration.header.color ?? 'primary'}
      >
        <Toolbar sx={{ paddingRight: 3 }}>
          {isItDesktop && !layoutConfiguration.sideMenu.permanent && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ marginRight: 4, display: open ? 'none' : 'inline-flex' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {headerElements || (
            <Typography component="h1" variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              {pageTitle}
            </Typography>
          )}
        </Toolbar>
      </StyledAppBar>

      {isItDesktop && (
        <Drawer
          variant="permanent"
          open={layoutConfiguration.sideMenu.permanent ? true : open}
          PaperProps={{
            component: layoutConfiguration.sideMenu.permanent ? DrawerPaper : open ? DrawerPaper : DrawerPaperClose,
          }}
        >
          <ToolbarIcon>
            {!layoutConfiguration.sideMenu.permanent && (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </ToolbarIcon>
          {!layoutConfiguration.sideMenu.permanent && <Divider />}
          <SideMenuItems />
        </Drawer>
      )}
    </>
  );
};
