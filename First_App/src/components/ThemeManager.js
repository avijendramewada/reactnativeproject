import React, {createContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import ManageThemeProvider from '../container/theme/index'
const ThemeManager = ({children}) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
);

export default ThemeManager;
