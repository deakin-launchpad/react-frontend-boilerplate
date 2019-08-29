import React, { createContext, useState } from 'react';
import { LayoutConfig } from 'configurations';
export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
  const { children } = props;
  const [pageTitle, setPageTitle] = useState(LayoutConfig.headerWelcomeText);
  const [headerElements, setHeaderElements] = useState(null);
  return <LayoutContext.Provider value={{ pageTitle, setPageTitle, headerElements, setHeaderElements }} >{children}</LayoutContext.Provider>
}
