import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [icon, setIcon] = useState('eye-off');

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
        return;
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

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextInput
            label="Password"
            style={{fontSize: 18}}
            secureTextEntry={true}
            mode="outlined"
            value={password}
            secureTextEntry={hidePass ? true : false}
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
        <Button mode="contained" onPress={() => userLogin()}>
          Login
        </Button>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{textAlign: 'center', fontSize: 18}}>
          Don't have a account
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Phone')}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Login with phone
          </Text>
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
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
    fontSize: 20,
    height: '47 %',
    marginTop:'1%',
  },
  icon: {
    zIndex: 3,
    position: 'absolute',
    alignSelf:'flex-end',
    marginRight:'4%'
//textAlign:'center'
    // marginTop: 20,
    // alignItems: 'center',
    //marginLeft: 200,
  },
});
