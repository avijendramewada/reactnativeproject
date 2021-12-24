import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ItemsScreen from '../screens/ItemsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateAdScreen from '../screens/CreateAdScreen';
import Feather from 'react-native-vector-icons/Feather';
import {StackNavigator,CreateAdStackNavigator,ProfileStackNavigator} from './stackNavigation';
import DrawerNavigator from './drawerNavigator';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Create') {
            iconName = 'plus-square';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                borderWidth: 5,
                borderColor: 'white',
                borderRadius: 30,
              }}>
              <Feather name={iconName} size={25} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={DrawerNavigator} options={{title: ''}} />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{title: ''}}
      />

      <Tab.Screen
        name="Create"
        component={CreateAdStackNavigator}
        options={{title: ''}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
