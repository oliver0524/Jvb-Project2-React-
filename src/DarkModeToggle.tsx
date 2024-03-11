import React, { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export const DarkModeToggle = () => {
  const contextValue = useContext(DarkModeContext);

  if (!contextValue) {
    // Handle the case when the context value is undefined
    return null;
  }

  const { isDarkMode, toggleDarkMode } = contextValue;

  //console.log('isDarkMode:', isDarkMode);

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};