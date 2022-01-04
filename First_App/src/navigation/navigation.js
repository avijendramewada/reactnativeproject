import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native';
import TabNavigator from './tabNavigator';
import StackNavigator from './authNavigator';
import {NavigationContainer,DefaultTheme} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
//import DrawerNavigator from './drawerNavigator';
 
const Navigation = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
   const unsubscribe = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    });
    return unsubscribe
  }, []);
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? <TabNavigator /> : <StackNavigator />}
      {/* <DrawerNavigator/> */}
    </NavigationContainer>
  );
};

export default Navigation
