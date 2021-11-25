/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

// import Header from './components/Header';
// import TodoItem from './components/TodoItem';
// import AddTodo from './components/AddTodo';
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
          }else if(route.name === 'Create'){
            iconName = 'plus-square'
          }

          // You can return any component that you like here!
          return <Feather name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={ItemsScreen} />
      <Tab.Screen name="Create" component={CreateAdScreen} />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  let user = 'vijendra';
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthNavigaror />}
    </NavigationContainer>
  );
};
const App = () => {
  // const [todos, setTodos] = useState([
  //   {text: 'Coffee', key: '1'},
  //   {text: 'Tea', key: '2'},
  //   {text: 'Cold drink', key: '3'},
  //   {text: 'Pizza', key: '4'},
  // ]);
  // const pressHandler = key => {
  //   setTodos(previousTodos => {
  //     return previousTodos.filter(todo => todo.key != key);
  //   });
  // };
  // // const addTodo = (item) =>{
  // //   alert("Thankyou for adding "+item);console.log("hello i am in console")
  // // }
  // const addTodo = item => {
  //   const newItem = {
  //     text: item,
  //     key: '7',
  //   };
  //   setTodos([newItem, ...todos]);
  // };
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#9ea7aa" />
        <View style={styles.container}>
          {/* <LoginScreen /> */}
          {/* <CreateAdScreen/> */}
          {/* <ItemsScreen /> */}
          <Navigation />
          {/* <SignUpScreen/> */}
          {/* <View style={styles.content}> */}
          {/* <Header />
        <AddTodo addTodo={addTodo} />
        <View style={styles.list}> */}

          {/* <FlatList
            data={todos}
            renderItem={({item}) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          /> */}
          {/* </View>
      </View> */}
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
