
import PropTypes from 'prop-types';
import { LoginContext, LoginProvider } from './common/login';
import { LayoutContext, LayoutProvider } from './common/layout';
import { DeviceInfoContext, DeviceInfoProvider } from './common/deviceInfo';

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
