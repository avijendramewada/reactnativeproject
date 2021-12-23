import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
const ProfileScreen = ({navigation}) => {
  const signOut = () => {
    auth().signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{auth().currentUser.email}</Text>
      <View style={styles.signoutbtn}>
        <Button mode="contained" onPress={() => signOut()}>
          SignOut
        </Button>
        <Button
          title="Go to home"
          onPress={() => navigation.navigate('Home')} // We added an onPress event which would navigate to the About screen
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
  },
  signoutbtn: {
    flex: 1,
    padding: '10%',
    justifyContent: 'flex-end',
    // alignItems:'center'
  },
});
export default ProfileScreen;
