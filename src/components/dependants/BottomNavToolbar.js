/**
 * Created by Qiaoli Wang.
 */
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Icon} from '@mui/material';
import { API } from '../../helpers';
import { LayoutContext } from '../../contexts';


export const BottomNavToolbar = () => {
  const [value, setValue] = useState(null);
  const { setPageTitle, layoutConfiguration, currentUserRole } = useContext(LayoutContext);
  let menuButtonLabel = (layoutConfiguration.menuButtonLabel !== undefined ?
    layoutConfiguration.menuButtonLabel !== '' ? layoutConfiguration.menuButtonLabel : 'menu'
    : 'menu');
  useEffect(() => {
    let counter = 0;
    let pathToCheck = String(window.location.pathname).split('/');
    let _controllerArr;
    layoutConfiguration.getMenuItems(currentUserRole).forEach(value => {
      _controllerArr = String(value.helpingAttribute).split('/');
      if (value.isFavorite) {
        if (pathToCheck[1] === (_controllerArr[0] === '' ? _controllerArr[1] : _controllerArr[0])) {
          return setValue(counter);
        }
        counter++;
      }
    });
    if (pathToCheck[1] === 'menu') {
      return setValue(layoutConfiguration.menuItems.length);
    }
  }, [currentUserRole, layoutConfiguration]);
  const renderIcons = () => {
    if (undefined !== layoutConfiguration)
      return layoutConfiguration.getMenuItems(currentUserRole).map((item, key) => {
        if (item.isFavorite) {
          if (item.type === 'logout')
            return <BottomNavigationAction onClick={() => { API.logoutUser(); }} label={item.name} icon={<Icon>
              {item.icon}
            </Icon>} key={key} />;
          return <BottomNavigationAction onClick={() => { setPageTitle(item.customTitle ? item.customTitle : item.name); }} component={Link} to={item.helpingAttribute} label={item.name} icon={<Icon>
            {item.icon}
          </Icon>} key={key} />;
        } return null;
      }
      );
    else return null;
  };

  return (<Paper style={{position:'fixed',margin:'auto',left:0,right:0,bottom:0}}>
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}>
      {renderIcons()}
      {layoutConfiguration.displayMobileMenuHam ? <BottomNavigationAction
        onClick={() => { setPageTitle(menuButtonLabel); }} component={Link} to={'/menu'} label={menuButtonLabel} icon={<Icon>
        menu</Icon>} /> : null}
    </BottomNavigation>
  </Paper>);
};

