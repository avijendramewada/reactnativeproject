import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';
const ProfileScreen = () => {
  const signOut = () =>{
 auth().signOut();
  }
  return (
    <View>
      <Text>{auth().currentUser.email}</Text>
      <Button mode="contained" onPress={() => signOut()}>
        SignOut
      </Button>
    </View>
  );
};
export default ProfileScreen;
