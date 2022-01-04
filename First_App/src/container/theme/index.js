import React, {createContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import ThemeContext from '../../utils/useTheme ';

import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
const defaultMode = Appearance.getColorScheme() || 'light';

const ManageThemeProvider = ({children}) => {
  const [themeState, setThemeState] = useState(defaultMode);
  const setMode = mode => {
    setThemeState(mode);
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return (
    <ThemeContext.Provider value={{mode: themeState, setMode}}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
        <>
          <StatusBar
            barStyle={themeState === 'dark' ? 'dark-content' : 'light-content'}
          />
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default ManageThemeProvider;
