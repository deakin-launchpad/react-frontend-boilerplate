import { useContext } from 'react';
import { List, Icon, ListItem, ListItemText, ListSubheader, Divider, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, Navigate } from 'react-router-dom';
import { API } from 'helpers';
import { LayoutContext } from 'contexts';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    backgroundColor: theme.palette.grey,
  },
  menu: {
    width: '100%',
    height: '100%'
  },
  menuMobile: {
    width: '100%'
  },
  menuItemText: {
    marginLeft: '5vw'
  },
  menuTitle: {
    paddingTop: "5vh",
    paddingBottom: "5vh",
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 1px rgba(76,45,45,0.80)'
  },
  logoutButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    paddingLeft: "5vw",
    paddingRight: "5vw"
  },
  listItem: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "5vw",
    paddingRight: "5vw"
  }
}));

export const MobileMenu = () => {
  const { layoutConfiguration } = useContext(LayoutContext);
  const classes = useStyles();
  const items = layoutConfiguration.menuItems;
  let menuButtonLabel = (layoutConfiguration.menuButtonLabel !== undefined ?
    layoutConfiguration.menuButtonLabel !== '' ? layoutConfiguration.menuButtonLabel : 'menu'
    : 'menu');
  let logoutButton = (data, key) => {
    return (<div key={'menu_button' + key}>
      {items.length > 0 ? <Divider /> : null}
      <ListItem onClick={() => { API.logoutUser(); }} button className={classes.logoutButton} >
        <Icon>
          {data.icon !== undefined ? data.icon : 'logout'}
        </Icon>
        <ListItemText className={classes.menuItemText} primary={data.name !== undefined ? data.name : 'Logout'} />
      </ListItem>
    </div >);
  };
  let isItDesktop = useMediaQuery('(min-width:600px) or (min-height:600px)');
  if (isItDesktop)
    return <Navigate to='/' />;
  const headerRenderStatus = () => {
    if (isItDesktop)
      return layoutConfiguration.header.visibleOnDesktop;
    else
      return layoutConfiguration.header.visibleOnMobile;
  };
  let content = (
    <div className={classes.root}>
      <List disablePadding
        className={headerRenderStatus() ? classes.menuMobile : classes.menu}
        component="nav"
        subheader={
          !headerRenderStatus() && (<ListSubheader className={classes.menuTitle} component="div" id="menuTitle">
            <Typography variant="h5">
              {menuButtonLabel}
            </Typography>
          </ListSubheader>)
        }>
        {headerRenderStatus() ? null : <Divider className={classes.menuTitleDivider} />}
        {
          items.map((value, i) => {
            if (!value.isFavourite) {
              if (value.type === 'logout')
                return logoutButton(value, i);
              return (
                <div key={'menu_button' + i}>
                  <ListItem button component={Link} className={classes.listItem} to={value.helpingAttribute}>
                    <Icon>
                      {value.icon}
                    </Icon>
                    <ListItemText className={classes.menuItemText} primary={value.name} />
                  </ListItem>
                  <Divider />
                </div>
              );
            }
            return null;
          })
        }
      </List>
    </div >
  );
  return content;
};
