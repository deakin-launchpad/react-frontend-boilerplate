import React, { createContext, useState } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
  const { children } = props;
  const [pageTitle, setPageTitle] = useState("Home");
  const [headerElements, setHeaderElements] = useState(null);
  return <LayoutContext.Provider value={{ pageTitle, setPageTitle, headerElements, setHeaderElements }} >{children}</LayoutContext.Provider>
}
