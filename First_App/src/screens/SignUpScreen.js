import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
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
  const [hidePass, setHidePass] = useState(true);

  const userSignup = async () => {
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
        return;
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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput
            label="Password"
            style={{fontSize: 18}}
            secureTextEntry={true}
            mode="outlined"
            secureTextEntry={hidePass ? true : false}
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <Feather
            style={styles.icon}
            name={hidePass ? 'eye-off' : 'eye'}
            size={25}
            color="grey"
            onPress={() => setHidePass(!hidePass)}
          />
        </View>
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
    fontSize: 20,
    height: '40%',
    marginTop: 10,
  },
  icon: {
    zIndex: 3,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: '4%',
    //textAlign:'center'
    // marginTop: 20,
    // alignItems: 'center',
    //marginLeft: 200,
  },
});
