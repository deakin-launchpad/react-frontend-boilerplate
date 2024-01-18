import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, ListItemButton, ListItemText,Icon,ListItemIcon} from '@mui/material';
import { LayoutContext } from '../../contexts';
import { API } from '../../helpers';
import { LayoutConfig } from '../../constants';

export const SideMenuItems = (props) => {
  const { setPageTitle, layoutConfiguration, currentUserRole } = useContext(LayoutContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuitemsController = (value, key) => {
    switch (value.type) {
      case 'button': return renderMenuButton(value.name, value.icon, value.helpingAttribute, value.customTitle, key);
      case 'logout': return renderLogoutButton(value.name, value.icon, key);
      default: return null;
    }
  };

  useEffect(() => {
    if (undefined !== layoutConfiguration) {
      let counter = 0;
      let pathToCheck = String(window.location.pathname).split('/');
      let _controllerArr;
      layoutConfiguration.getMenuItems(currentUserRole).forEach(value => {
        _controllerArr = String(value.helpingAttribute).split('/');
        if (value.isFavorite) {
          if (pathToCheck[1] === (_controllerArr[0] === '' ? _controllerArr[1] : _controllerArr[0])) {
            setSelectedIndex(counter);
          }
          counter++;
        }
      });
      if (pathToCheck[1] === 'menu') {
        setSelectedIndex(counter + 1);
      }
    }
  }, [currentUserRole, layoutConfiguration]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const renderMenuButton = (name, icon, link, customTitle, key) => {
    return (
      <ListItemButton key={key} selected={selectedIndex === key} component={Link} to={link} onClick={(e) => {
        handleListItemClick(e, key);
        return setPageTitle((customTitle === undefined || customTitle === '' ? name : customTitle));
      }}>
        <ListItemIcon>
          <Icon className='sidebar-icon'>
            {icon}
          </Icon>
        </ListItemIcon>
        <ListItemText primary={name} sx={{ opacity: props.open ? 1 : 0 }} />
      </ListItemButton >
    );
  };

  const renderLogoutButton = (name, icon, key) => {
    return (
      <ListItemButton key={key}  onClick={() => {
        API.logoutUser();
      }}>
        <ListItemIcon>
          <Icon className='sidebar-icon'>
            {icon}
          </Icon>
        </ListItemIcon>
        <ListItemText primary={name}  sx={{ opacity: props.open ? 1 : 0 }} />
      </ListItemButton>
    );
  };

  return (
    <List>
      {LayoutConfig.getMenuItems(currentUserRole).map((value, i) => {
        return menuitemsController(value, i);
      })}
    </List>
  );
};

SideMenuItems.propTypes = {
  open: PropTypes.bool.isRequired
};
