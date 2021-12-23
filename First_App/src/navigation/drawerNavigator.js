import React from 'react';
//import TabNavigator from './TabNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {CreateAdStackNavigator, ProfileStackNavigator} from './stackNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={CreateAdStackNavigator} />
      <Drawer.Screen name="Contact" component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
