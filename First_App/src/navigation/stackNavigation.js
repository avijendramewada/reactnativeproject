import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAdScreen from '../screens/CreateAdScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemsScreen from '../screens/ItemsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
};
function CartIcon() {
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Profile');
  };

  return <Ionicons size={23} style={{marginRight:12}} name={'notifications'} onPress={navigateToCart} />;
}

const StackNavigator = () => {
  return (
    <Stack.Navigator name="back" screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={ItemsScreen}
        options={{
          headerShown: true,
          headerLift: props => <CartIcon {...props} />,
        }}
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

export {StackNavigator, CreateAdStackNavigator, ProfileStackNavigator};
