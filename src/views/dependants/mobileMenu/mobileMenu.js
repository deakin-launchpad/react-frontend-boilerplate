import { useContext } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Typography,
  useMediaQuery,
  Icon,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import { API } from 'helpers';
import { LayoutContext } from 'contexts';
import { LayoutConfig } from 'constants/index';

const Root = styled(Box)(({ theme }) => ({
  minWidth: '100%',
  backgroundColor: theme.palette.grey[100],
}));

const Menu = styled(List)({
  width: '100%',
  height: '100%',
});

const MenuItemText = styled(ListItemText)({
  marginLeft: '5vw',
});

const MenuTitle = styled(ListSubheader)(({ theme }) => ({
  paddingTop: '5vh',
  paddingBottom: '5vh',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  boxShadow: '0 1px rgba(76,45,45,0.80)',
}));

const LogoutButton = styled(ListItem)({
  color: 'black',
  paddingLeft: '5vw',
  paddingRight: '5vw',
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingLeft: '5vw',
  paddingRight: '5vw',
}));

export const MobileMenu = () => {
  const { layoutConfiguration, currentUserRole } = useContext(LayoutContext);
  const items = LayoutConfig.getMenuItems(currentUserRole);

  const isItDesktop = useMediaQuery('(min-width:600px) or (min-height:600px)');
  if (isItDesktop) return <Navigate to='/' />;

  const headerRenderStatus = () =>
    isItDesktop
      ? layoutConfiguration.header.visibleOnDesktop
      : layoutConfiguration.header.visibleOnMobile;

  const menuButtonLabel = layoutConfiguration.menuButtonLabel || 'menu';

  const renderLogoutButton = (data, key) => (
    <div key={`menu_button_${key}`}>
      {items.length > 0 && <Divider />}
      <LogoutButton button onClick={() => API.logoutUser()}>
        <Icon>{data.icon || 'logout'}</Icon>
        <MenuItemText primary={data.name || 'Logout'} />
      </LogoutButton>
    </div>
  );

  return (
    <Root>
      <Menu
        disablePadding
        component="nav"
        className={headerRenderStatus() ? '' : ''}
        subheader={
          !headerRenderStatus() && (
            <MenuTitle component="div" id="menuTitle">
              <Typography variant="h5">{menuButtonLabel}</Typography>
            </MenuTitle>
          )
        }
      >
        {!headerRenderStatus() && <Divider />}
        {items.map((item, i) => {
          if (!item.isFavourite) {
            if (item.type === 'logout') return renderLogoutButton(item, i);
            return (
              <div key={`menu_button_${i}`}>
                <StyledListItem button component={Link} to={item.helpingAttribute}>
                  <Icon>{item.icon}</Icon>
                  <MenuItemText primary={item.name} />
                </StyledListItem>
                <Divider />
              </div>
            );
          }
          return null;
        })}
      </Menu>
    </Root>
  );
};
