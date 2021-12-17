import React, {useState} from 'react';
import {Button, TextInput, View, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginWithPhone = () => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNum, setPhoneNum] = useState('');

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <View>
        <TextInput
          placeholder="enter your number"
          value={phoneNum}
          onChangeText={num => setPhoneNum(num)}
        />
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber(phoneNum)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <TextInput
        style={{backgroundColor: 'grey'}}
        placeholder="enter codde"
        value={code}
        onChangeText={text => setCode(text)}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </SafeAreaView>
  );
};
export default LoginWithPhone;
