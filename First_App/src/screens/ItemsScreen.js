import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

function ItemsScreen(props) {
  const items = [
    {
      name: 'Celerio',
      description: 'white color model zxi',
      img_url: 'https://imgd.aeplcdn.com/0x0/n/r3ljc5a_1434074.jpg',
      year: 2019,
      price: 450000,
      contact_number: 9131298358,
    },
    {
      name: 'KTM bike',
      description: 'red and black color',
      img_url:
        'https://4.imimg.com/data4/VE/UI/GLADMIN-10336970/ktm-bike-on-rent-500x500.jpg',
      year: 2019,
      price: 10000,
      contact_number: 9131298351,
    },
    {
      name: 'Bolero ',
      description: 'white color with good condition',
      img_url:
        'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Bolero/7233/1632121139564/front-left-side-47.jpg',
      year: 2018,
      price: 650000,
      contact_number: 9131298359,
    },
  ];
  const renderItem = item => {
    return (
      <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.description}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: item.img_url}} />
        <Card.Actions>
          <Button>{item.price}</Button>
          <Button>call seller</Button>
        </Card.Actions>
      </Card>
    );
  };
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={item => item.contact_number}
        renderItem={({item}) => renderItem(item)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 3,
  },
});

export default ItemsScreen;
