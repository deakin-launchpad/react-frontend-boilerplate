import React from 'react'
import { LoginContext, LoginProvider } from './common/LoginContext';

export {
  LoginContext,
  LoginProvider
}

export const ContextManager = (props) => {
  const { children } = props;
  let contextProviders = (
    <LoginProvider>
      {children}
    </LoginProvider>
  )
  return contextProviders;
}
