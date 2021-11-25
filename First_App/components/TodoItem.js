import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const TodoItem = ({item, pressHandler}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        pressHandler(item.key);
      }}>
      <Text style={styles.title}>{item.text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 12,
    margin: 20,
    backgroundColor: '#bbb',
    marginTop: 7,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default TodoItem;
