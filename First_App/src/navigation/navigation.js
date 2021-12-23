import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native';
import TabNavigator from './tabNavigator';
import StackNavigator from './authNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
//import DrawerNavigator from './drawerNavigator';
 
const Navigation = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <StackNavigator />}
      {/* <DrawerNavigator/> */}
    </NavigationContainer>
  );
};

export default Navigation
