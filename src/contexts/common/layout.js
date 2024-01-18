/**
 * Created by Sanchit Dang. Updated by Qiaoli Wang.
 */
import { createContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { LayoutConfig,  Themes } from '../../constants';
import { Loading } from '../../components';
export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
  const { children } = props;
  const [pageTitle, setPageTitle] = useState('');
  const [headerElements, setHeaderElements] = useState(null);
  const [pathToCheck] = useState(String(window.location.pathname).split('/'));
  const [layoutConfiguration, setConfiguration] = useState(LayoutConfig);
  const [currentUserRole, setCurrentUserRole] = useState('DEFAULT');

  const [currentTheme, setCurrentTheme] = useState({
    compact: false,
    direction: 'ltr',
    responsiveFontSizes: true,
    roundedCorners: true,
    theme: Themes.LIGHT
  });
  useEffect(() => {
    let controllerArr;
    LayoutConfig.getMenuItems(currentUserRole).forEach(value => {
      controllerArr = String(value.helpingAttribute).split('/');
      if (pathToCheck[1] === controllerArr[1]) {
        setPageTitle((value.customTitle === undefined || value.customTitle === '' ? value.name : value.customTitle));
      }
    });
    if (pathToCheck[1] === 'menu') {
      setPageTitle('Menu');
    }
  }, [pathToCheck, currentUserRole]);

  const changeConfiguration = (item, data) => {
    setConfiguration({ ...layoutConfiguration, [item]: data });
  };

  if (currentUserRole === undefined) return <Loading />;
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
