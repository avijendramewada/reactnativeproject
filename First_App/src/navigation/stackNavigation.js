import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAdScreen from '../screens/CreateAdScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemsScreen from '../screens/ItemsScreen';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};


const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={ItemsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
const CreateAdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="CreateAd" component={CreateAdScreen} />
    </Stack.Navigator>
  );
};
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};


export {StackNavigator,CreateAdStackNavigator,ProfileStackNavigator};
