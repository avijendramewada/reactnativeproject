import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {TextInput, Button, Modal, Portal} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

function CreateAdScreen({navigation}) {
  const [name, setName] = useState('');
  const [descp, setDescp] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function selectImage() {
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // let options = {
    //   title: 'You can choose one image',
    //   maxWidth: 800,
    //   maxHeight: 700,
    //   storageOptions: {
    //     skipBackup: true,
    //   },
    // };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri;
        console.log('uri', response.assets[0].uri);
        setImageSource(source);
        hideModal();
      }
    });
  }
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let isCameraPermitted = await requestCameraPermission();
   // let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        let source = response.assets[0].uri;
        setImageSource(source);
        hideModal();
      });
    }
  };

  const createPost = async () => {
    if (!name && !descp && !year && !price && !phone) {
      Alert.alert('please fill all field!');
    } else if (!name) {
      alert("name can't be blank");
      return;
    } else if (isNaN(year) || !year) {
      alert('post only between 2000 to 2021.');
      return false;
    } else if (isNaN(price) || !price) {
      alert('please enter price');
      return;
    } else if (isNaN(phone) || phone < 1 || phone.length < 10) {
      alert('Enter valid mobile number.');
      return false;
    } else if (imageSource === null) {
      alert('Please select image!');
      return;
    } else {
      try {
        await firestore().collection('ads').add({
          name,
          descp,
          year,
          price,
          phone,
          imageSource,
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
        navigation.navigate('Home');
      }
    }
  };
  const containerStyle = {
    backgroundColor: 'white',
    margin: '20%',
    height: '50%',
    alignItems: 'center',
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
        keyboardType="numeric"
        style={{fontSize: 18}}
        mode="outlined"
        value={year}
        onChangeText={year => setYear(year)}
      />
      <TextInput
        label="price in INR"
        keyboardType="numeric"
        style={{fontSize: 18}}
        mode="outlined"
        value={price}
        onChangeText={price => setPrice(price)}
      />
      <TextInput
        label="Your contact number"
        keyboardType="numeric"
        style={{fontSize: 18}}
        mode="outlined"
        value={phone}
        onChangeText={phone => setPhone(phone)}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Button
            style={{width: '60%', textAlign: 'center'}}
            icon="camera"
            mode="contained"
            onPress={captureImage}></Button>
          <Button
            style={{width: '60%', marginTop: 20, textAlign: 'center'}}
            mode="contained"
            onPress={selectImage}>
            Gallary
          </Button>
        </Modal>
      </Portal>

      <Button mode="contained" onPress={showModal}>
        Upload photo
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
