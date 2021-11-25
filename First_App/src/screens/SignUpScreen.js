import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';


function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Button
          mode="contained"
          onPress={() => console.log('Signup successfully')}>
           SignUp
        </Button>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            login?
          </Text>
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
