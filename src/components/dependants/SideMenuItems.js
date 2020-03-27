import React, { useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { LayoutContext } from 'contexts';
import { API } from 'helpers';

export const SideMenuItems = withRouter(() => {
  const { setPageTitle, layoutConfiguration } = useContext(LayoutContext);
  const menuItems = layoutConfiguration.menuItems !== undefined ? layoutConfiguration.menuItems : [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuitemsController = (value, key) => {
    switch (value.type) {
    case 'button': return renderMenuButton(value.name, value.icon, value.controller, value.customTitle, key);
    case 'logout': return renderLogoutButton(value.name, value.icon, key);
    default: return null;
    }
  };
  useEffect(() => {
    if (undefined !== layoutConfiguration) {
      let counter = 0;
      let _pathtoCheck = String(window.location.pathname).split('/');
      let _controllerArr;
      layoutConfiguration.menuItems.forEach(value => {
        _controllerArr = String(value.controller).split('/');
        if (value.isFavourite) {
          if (_pathtoCheck[1] === (_controllerArr[0] === '' ? _controllerArr[1] : _controllerArr[0])) {
            setSelectedIndex(counter);
          }
          counter++;
        }
      });
      if (_pathtoCheck[1] === 'menu') {
        setSelectedIndex(counter + 1);
      }
    }
  }, [layoutConfiguration]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const renderMenuButton = (name, icon, link, customTitle, key) => {
    return (
      <ListItem key={key} button selected={selectedIndex === key} component={Link} to={link} onClick={(e) => {
        handleListItemClick(e, key);
        return setPageTitle((customTitle === undefined || customTitle === '' ? name : customTitle));
      }}>
        <ListItemIcon>
          <i className="material-icons">{icon}</i>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  };

  const renderLogoutButton = (name, icon, key) => {
    return (
      <ListItem key={key} button onClick={() => {
        API.logoutUser();
      }}>
        <ListItemIcon>
          <i className="material-icons">{icon}</i>
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  };

  return (
    <List>
      {menuItems.map((value, i) => {
        return menuitemsController(value, i);
      }
      )}
    </List>
  );
});
