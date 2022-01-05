import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  Linking,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Feather from 'react-native-vector-icons/Feather';

function ItemsScreen(props) {
  const [item, setItem] = useState([]);
  const myItem = async () => {
    await firestore()
      .collection('ads')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        const result = querySnapshot.docs.map(documentSnapshot => {
          //console.log('User ID: ', documentSnapshot.data());
          return documentSnapshot.data();
        });
        //console.log(result);
        setItem(result);
      });
    // const subscriber = await firestore().collection('ads');
    // subscriber.onSnapshot(snap => {
    //   const result = snap.docs.map(item => item.data());
    //   setItem(result);
    //   console.log('updated');
    // });
    //const result = subscriber.docs.map(item => item.data());
    // console.log(item);
    // setItem(result);
    // .then(querySnapshot => {
    //   const saveFirebaseTodos = [];
    //   console.log('total items in ', querySnapshot.size);
    //   querySnapshot.forEach(documentSnapshot => {
    //     saveFirebaseTodos.push(documentSnapshot.data());
    //     console.log('item id', documentSnapshot.id, documentSnapshot.data());
    //   });
    //   setItem(saveFirebaseTodos);
    //   //console.log('json data', JSON.parse(item));
    // });
  };

  useEffect(() => {
    myItem();
    return () => {
      console.log('Clean up');
    };
  }, []);
  // const items = [
  //   {
  //     name: 'Celerio',
  //     description: 'white color model zxi',
  //     img_url: 'https://imgd.aeplcdn.com/0x0/n/r3ljc5a_1434074.jpg',
  //     year: 2019,
  //     price: 450000,
  //     contact_number: 9131298358,
  //   },
  //   {
  //     name: 'KTM bike',
  //     description: 'red and black color',
  //     img_url:
  //       'https://4.imimg.com/data4/VE/UI/GLADMIN-10336970/ktm-bike-on-rent-500x500.jpg',
  //     year: 2019,
  //     price: 10000,
  //     contact_number: 9131298351,
  //   },
  //   {
  //     name: 'Bolero ',
  //     description: 'white color with good condition',
  //     img_url:
  //       'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/7233/1632121139564/front-left-side-47.jpg',
  //     year: 2018,
  //     price: 650000,
  //     contact_number: 9131298359,
  //   },
  // ];
  const renderItem = item => {
    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.name}
          right={props => (
            <Feather
              {...props}
              icon="more-verticalss"
              onPress={() => Alert.alert('click')}
            />
          )}
        />
        <Card.Content>
          <Paragraph>{item.descp}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.imageSource}} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button onPress={() => openDial(item.phone)}>call seller</Button>
        </Card.Actions>
      </Card>
    );
  };
  const openDial = phone => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };
  return (
    <View>
      <FlatList
        data={item}
        keyExtractor={item => item.phone}
        renderItem={({item}) => renderItem(item)}
      />
      {/* <Text>{item.name}</Text>
      <Image
        source={{
          uri: item.imageSource,
        }}
        width={400}
        height={300}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 3,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});

export default ItemsScreen;
