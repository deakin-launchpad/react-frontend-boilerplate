/***
 *  Created by Nirav Bhimani
 *  Contributors : Sanchit Dang *12/08/19*
 ***/

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Icon as ParentIcon } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { API } from 'helpers';
import { LayoutContext } from 'contexts';
import { InlineIcon } from '@iconify/react-with-api';

let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

const useStyles = makeStyles(theme => createStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: '0'
  },
  iOSPadding: {
    height: iOS ? theme.spacing(2) : 0
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export const BottomNavToolbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const { setPageTitle, layoutConfiguration, currentUserRole } = useContext(LayoutContext);
  let menuButtonLabel = (layoutConfiguration.menuButtonLabel !== undefined ?
    layoutConfiguration.menuButtonLabel !== '' ? layoutConfiguration.menuButtonLabel : 'menu'
    : 'menu');
  useEffect(() => {
    let counter = 0;
    let _pathtoCheck = String(window.location.pathname).split('/');
    let _controllerArr;
    layoutConfiguration.getMenuItems(currentUserRole).forEach(value => {
      _controllerArr = String(value.helpingAttribute).split('/');
      if (value.isFavourite) {
        if (_pathtoCheck[1] === (_controllerArr[0] === '' ? _controllerArr[1] : _controllerArr[0])) {
          return setValue(counter);
        }
        counter++;
      }
    });
    if (_pathtoCheck[1] === 'menu') {
      return setValue(layoutConfiguration.menuItems.length);
    }
  }, [currentUserRole, layoutConfiguration]);
  const renderIcons = () => {
    if (undefined !== layoutConfiguration)
      return layoutConfiguration.getMenuItems(currentUserRole).map((item, key) => {
        if (item.isFavourite) {
          if (item.type === 'logout')
            return <BottomNavigationAction onClick={() => { API.logoutUser(); }} label={item.name} icon={<ParentIcon>
              <InlineIcon icon={item.icon} />
            </ParentIcon>} key={key} />;
          return <BottomNavigationAction onClick={() => { setPageTitle(item.customTitle ? item.customTitle : item.name); }} component={Link} to={item.helpingAttribute} label={item.name} icon={<ParentIcon>
            <InlineIcon icon={item.icon} />
          </ParentIcon>} key={key} />;
        } return null;
      }
      );
    else return null;
  };

  return (<Paper className={classes.root}>
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}

    >
      {renderIcons()}
      {layoutConfiguration.displayMobileMenuHam ? <BottomNavigationAction
        onClick={() => { setPageTitle(menuButtonLabel); }} component={Link} to={'/menu'} label={menuButtonLabel} icon={<ParentIcon>
          <InlineIcon icon='bytesize:menu' />
        </ParentIcon>} /> : null}

    </BottomNavigation>
    <div className={classes.iOSPadding} />
  </Paper>);
};

