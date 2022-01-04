import React from 'react';
//import TabNavigator from './TabNavigator';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {CreateAdStackNavigator, ProfileStackNavigator} from './stackNavigation';
import ProfileScreen from '../screens/ProfileScreen';
import ItemsScreen from '../screens/ItemsScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={ItemsScreen} />
      <Drawer.Screen name="Notifications" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       drawerStyle={{backgroundColor:'blue'}}
//       initialRouteName="Home"
//       drawerPosition="right"
//       drawerContentOptions={{
//         activeTintColor: 'white',
//         inactiveTintColor: 'white',
//         itemStyle: {alignItems: 'flex-end'},
//       }}>
//       <Drawer.Screen name="Home" component={ItemsScreen} />
//       <Drawer.Screen name="Contact" component={ProfileScreen} />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
