import React, {useState,useEffect} from 'react';
import type {Node} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import SignUpScreen from './src/screens/SignUpScreen';
import CreateAdScreen from './src/screens/CreateAdScreen';
import ItemsScreen from './src/screens/ItemsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
  },
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthNavigaror = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
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
            <View style={{borderWidth:5,borderColor:'white',borderRadius:30}}>
              <Feather name={iconName} size={25} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={ItemsScreen} options={{title: ''}} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: ''}}
      />

      <Tab.Screen
        name="Create"
        component={CreateAdScreen}
        options={{title: ''}}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const[user,setUser]=useState('');

 useEffect(()=>{
 auth().onAuthStateChanged((userExist) =>{
   if(userExist){
     setUser(userExist)
   }else{
     setUser('')
   }
 })
 },[])

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigaror />}
    </NavigationContainer>
  );
};
const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#9ea7aa" />
        <View style={styles.container}>
          <Navigation />
        </View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 0,
  },
  list: {
    marginTop: 20,
  },
});

export default App;
