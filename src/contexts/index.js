
import PropTypes from 'prop-types';
import { LoginContext, LoginProvider } from './common/LoginContext';
import { LayoutContext, LayoutProvider } from './common/LayoutContext';
import { DeviceInfoContext, DeviceInfoProvider } from './common/DeviceInfoContext';

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  DeviceInfoContext,
  DeviceInfoProvider
};

export const ContextManager = (props) => {
  const { children } = props;
  return (
    <DeviceInfoProvider>
      <LayoutProvider>
        <LoginProvider>
          {children}
        </LoginProvider>
      </LayoutProvider>
    </DeviceInfoProvider>
  );
};

ContextManager.propTypes = {
  children: PropTypes.node.isRequired
};
