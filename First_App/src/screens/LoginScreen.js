import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';


function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const userLogin = async () => {
      if (!email && !password) {
        Alert.alert('Please enter email and password');
        return;
      }
      if (!email) {
        Alert.alert('please enter email');
        return;
      }
      if (!password) {
        Alert.alert('please enter password');
        return;
      }
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('User Login successfully');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            Alert.alert('please enter valid username');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Please enter correct password');
          }
          return
        });
    };


  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Image
          style={styles.logoImage}
          source={{
            uri: 'https://t3.ftcdn.net/jpg/04/30/61/82/360_F_430618222_l4j37g1Us8ZPhTQzD4QoQqyCHOHqKo7w.jpg',
          }}
        />
        <Text style={styles.heading}> Please Login to continue!</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          label="Email"
          style={{fontSize: 18}}
          mode="outlined"
          value={email}
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          label="Password"
          style={{fontSize: 18}}
          secureTextEntry={true}
          mode="outlined"
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <Button mode="contained" onPress={() => userLogin()}>
          Login
        </Button>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Don't have a account
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fafafa',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    paddingHorizontal: 40,
    fontSize:20,
    height: '50%',
    justifyContent: 'space-evenly',
  },
});
