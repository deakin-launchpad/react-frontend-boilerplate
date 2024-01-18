import { useContext,useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useMediaQuery} from '@mui/material';
import { Box ,Toolbar,Drawer as MuiDrawer,AppBar as MuiAppBar,CssBaseline,Typography,Icon} from '@mui/material';
import { SideMenuItems, BottomNavToolbar } from '../components';
import { LayoutContext } from '../contexts';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    width: `100%`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Layout = (props) => {
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  //const theme = useTheme();
  const { pageTitle, headerElements, layoutConfiguration } = useContext(LayoutContext);
  const [open, setOpen] = useState(isItDesktop ? (layoutConfiguration.sideMenu.default === 'open' ? true : false) : false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(!isItDesktop) setOpen(false);
    return ()=>{
      setOpen(true);
    };
  },[isItDesktop]);

  let content = (
    <Box sx={{display:'flex' }}>
      <CssBaseline />
      {<AppBar position="fixed" open={open}>
        <Toolbar>
          {isItDesktop && <Icon
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose :handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          > {!open ? 'menu' :'menu_open' }
          </Icon>}
          {
            headerElements !== null ? headerElements :
              <Typography variant="h6" noWrap component="div">
                {pageTitle}
              </Typography>
          }
        </Toolbar>
      </AppBar>}
      {isItDesktop && <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <SideMenuItems open={open} />
      </Drawer>}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
      {isItDesktop ? null : layoutConfiguration.bottomMobileNavigation ? <BottomNavToolbar /> : null}
    </Box>
  );
  return content;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

