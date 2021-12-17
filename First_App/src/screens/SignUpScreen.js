import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignup = async () => {
    if (!email && !password) {
      Alert.alert('Please enter email and password');
      return;
    }
    if(!email){
      Alert.alert('please enter email')
      return
    }
    if (!password) {
      Alert.alert('please enter password');
      return;
    }
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User register successfully');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
          if (error.code === 'auth/weak-password') {
          Alert.alert('Password should be at least 6 characters');
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
            uri: 'https://previews.123rf.com/images/faysalfarhan/faysalfarhan1605/faysalfarhan160504742/57292278-sign-up-member-icon-glossy-cyan-blue-round-button.jpg',
          }}
        />
        <Text style={styles.heading}> Please Signup</Text>
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
        <Button mode="contained" onPress={() => userSignup()}>
          SignUp
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{textAlign: 'center', fontSize: 18}}>login?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 250,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    paddingHorizontal: 40,
    height: '50%',
    justifyContent: 'space-evenly',
  },
});
