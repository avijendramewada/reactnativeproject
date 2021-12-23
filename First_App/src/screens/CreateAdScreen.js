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
//import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';

function CreateAdScreen(props) {
  const [name, setName] = useState('');
  const [descp, setDescp] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [imageSource, setImageSource] = useState(null);

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, response => {
      console.log(response.uri);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].fileName;
        setImageSource(source);
        Alert.alert(imageSource);
      }
    });
  }

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
      <Button icon="camera" mode="contained" onPress={selectImage}>
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
