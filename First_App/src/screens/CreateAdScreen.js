import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';

function CreateAdScreen(props) {
  const [name, setName] = useState('');
  const [descp, setDescp] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        setState(source);
      }
    });
  };

  const createPost = async () => {
    if (!name || !descp || !year || !price || !phone) {
      Alert.alert('please fill all field!');
    } else {
      try {
        await firestore().collection('ads').add({
          name,
          descp,
          year,
          price,
          phone,
          image: 'https://imgd.aeplcdn.com/0x0/n/r3ljc5a_1434074.jpg',
          uid: auth().currentUser.uid,
        });
      } catch (error) {
        Alert.alert('something went wroung');
      } finally {
        setName('');
        setDescp('');
        setPrice('');
        setYear('');
        setPhone('');
      }
    }
  };

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
      <Button icon="camera" mode="contained" onPress={() => selectFile()}>
        Upload Image
      </Button>
      <Button mode="contained" onPress={() => createPost()}>
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
