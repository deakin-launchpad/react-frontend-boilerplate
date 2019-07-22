import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { SideMenuItemsConfig } from 'configurations'
import { LayoutContext } from 'contexts'

export const SideMenuItems = (props) => {
  const menuItems = SideMenuItemsConfig.items;
  const { setPageTitle } = useContext(LayoutContext)
  const menuitemsController = (value, key) => {
    switch (value.type) {
      case 'button': return renderMenuButton(value.name, value.icon, value.controller, value.customTitle, key);
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
