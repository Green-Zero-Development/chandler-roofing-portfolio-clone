'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';

const HeaderContext = createContext({
  setTransparent: () => {},
  setColor: () => {},
  clearHeaderClass: () => {},
  headerClass: ''
});

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
  const [headerClass, setHeaderClass] = useState('');

  const setTransparent = useCallback(() => setHeaderClass('transparent-header'), []);
  const setColor = useCallback(() => setHeaderClass('colored-header'), []);
  const clearHeaderClass = useCallback(() => setHeaderClass(''), []);

  return (
    <HeaderContext.Provider value={{ setTransparent, setColor, clearHeaderClass, headerClass }}>
      {children}
    </HeaderContext.Provider>
  );
};
