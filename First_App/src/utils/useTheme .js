import {Appearance, AppearanceProvider} from 'react-native-appearance';
import react,{createContext} from 'react'
const defaultMode = Appearance.getColorScheme() || 'light';

const ThemeContext = createContext({
  mode: defaultMode,
  setMode: mode => console.log(mode),
});

export const useTheme = () => React.useContext(ThemeContext);
