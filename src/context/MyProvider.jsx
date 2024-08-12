import React, { useState } from 'react';
import MyContext from './MyContext';

// Create a provider component
export const MyProvider = ({ children }) => {
  const [state, setState] = useState('default value');
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <MyContext.Provider value={{ state, setState,isLoggedin, setIsLoggedin }}>
      {children}
    </MyContext.Provider>
  );
};
