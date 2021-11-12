import { createContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { LayoutConfig, THEMES } from 'constants/index';
import { LoadingScreen } from 'components/index';
export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
  const { children } = props;
  const [pageTitle, setPageTitle] = useState('');
  const [headerElements, setHeaderElements] = useState(null);
  let _pathtoCheck = String(window.location.pathname).split('/');
  const [layoutConfiguration, setConfiguration] = useState(LayoutConfig);
  const [currentUserRole, setCurrentUserRole] = useState('DEFAULT');

  const [currentTheme, setCurrentTheme] = useState({
    compact: false,
    direction: 'ltr',
    responsiveFontSizes: true,
    roundedCorners: true,
    theme: THEMES.LIGHT
  });
  useEffect(() => {
    let _controllerArr;
    LayoutConfig.getMenuItems(currentUserRole).forEach(value => {
      _controllerArr = String(value.helpingAttribute).split('/');
      if (_pathtoCheck[1] === _controllerArr[1]) {
        setPageTitle((value.customTitle === undefined || value.customTitle === '' ? value.name : value.customTitle));
      }
    });
    if (_pathtoCheck[1] === 'menu') {
      setPageTitle('Menu');
    }
  }, [_pathtoCheck, currentUserRole]);

  const changeConfiguration = (item, data) => {
    setConfiguration({ ...layoutConfiguration, [item]: data });
  };

  if (currentUserRole === undefined) return <LoadingScreen />;
  return <LayoutContext.Provider value={{
    pageTitle, setPageTitle,
    headerElements, setHeaderElements,
    layoutConfiguration, changeConfiguration,
    currentUserRole, setCurrentUserRole,
    currentTheme, setCurrentTheme
  }} >{children}</LayoutContext.Provider>;
};

LayoutProvider.propTypes = {
  children: PropTypes.node
};
