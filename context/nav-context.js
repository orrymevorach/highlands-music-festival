import React, { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const useNavContext = () => {
  return useContext(NavContext);
};

export const NavProvider = ({ children, navData = [] }) => {
  return <NavContext.Provider value={navData}>{children}</NavContext.Provider>;
};
