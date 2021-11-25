import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

function CreateAdScreen(props) {
  const [name, setName] = useState('');
  const [descp, setDescp] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
        Create Ad!
      </Text>
      <TextInput
        label="Name"
        style={{fontSize: 18}}
        mode="outlined"
        value={name}
        onChangeText={name => setName(name)}
      />
      <TextInput
        label="Describe what you are selling"
        style={{fontSize: 18}}
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        value={descp}
        onChangeText={descp => setDescp(descp)}
      />
      <TextInput
        label="year"
        style={{fontSize: 18}}
        mode="outlined"
        value={year}
        onChangeText={year => setYear(year)}
      />
      <TextInput
        label="price in INR"
        style={{fontSize: 18}}
        mode="outlined"
        value={price}
        onChangeText={price => setPrice(price)}
      />
      <TextInput
        label="Your contact number"
        style={{fontSize: 18}}
        mode="outlined"
        value={phone}
        onChangeText={phone => setPhone(phone)}
      />
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}>
        Upload Image
      </Button>
      <Button mode="contained" onPress={() => console.log('post successfully')}>
        Post
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'space-evenly',
  },
});

export default CreateAdScreen;
