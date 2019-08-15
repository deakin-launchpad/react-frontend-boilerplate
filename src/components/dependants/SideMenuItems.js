import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LayoutConfig } from 'configurations';
import { LayoutContext } from 'contexts';
import { API } from 'helpers'

export const SideMenuItems = (props) => {
  const menuItems = LayoutConfig.menuItems !== undefined ? LayoutConfig.menuItems : [];
  const { setPageTitle } = useContext(LayoutContext)
  const menuitemsController = (value, key) => {
    switch (value.type) {
      case 'button': return renderMenuButton(value.name, value.icon, value.controller, value.customTitle, key);
      case 'logout': return renderLogoutButton(value.name, value.icon, key)
      default: return null;
    }
  }

  const renderMenuButton = (name, icon, link, customTitle, key) => {
    return (
      <ListItem key={key} button component={Link} to={link} onClick={() => {
        return setPageTitle((customTitle === undefined || customTitle === '' ? name : customTitle))
      }}>
        <ListItemIcon>
          <i className="material-icons">{icon}</i>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    )
  }

  const renderLogoutButton = (name, icon, key) => {
    return (
      <ListItem key={key} button onClick={() => {
        API.logoutUser()
      }}>
        <ListItemIcon>
          <i className="material-icons">{icon}</i>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    )
  }

  return (
    <List>
      {menuItems.map((value, i) => {
        return menuitemsController(value, i)
      }
      )}
    </List>
  );
};

export default withRouter(SideMenuItems);
