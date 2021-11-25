import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';


function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Button mode="contained" onPress={() => console.log('login successfully',email,password)}>
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
