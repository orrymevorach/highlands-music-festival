import React, { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const useNavContext = () => {
  return useContext(NavContext);
};

export const NavProvider = ({ children, navData }) => {
  const filteredNavData = navData.filter(({ url }) => url !== '/');
  return (
    <NavContext.Provider value={filteredNavData}>
      {children}
    </NavContext.Provider>
  );
};
