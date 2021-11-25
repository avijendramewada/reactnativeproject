import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Button} from 'react-native';

const AddTodo = ({addTodo}) => {
  const [isShown, setIsShown] = useState(false);
  const [todo, setTodo] = useState();
  return (
    <View>
      <View style={styles.addTodo}>
        <TextInput
          style={styles.input}
          placeholder={'Add Todos'}
          onChangeText={textValue => {
            setTodo(textValue);
          }}
          blurOnSubmit={false}
        />
      </View>
      <View>
        <Button
          style={styles.btn}
          title="Add"
          onPress={() => {
            addTodo(todo),setTodo(' ');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  addTodo: {
    marginTop: 15,
    margin: 20,
    backgroundColor: '#f0ede6',
    borderRadius: 20,
  },
  input: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  btn: {
    width: '11%',
    height: 80,
    backgroundColor: 'green',
  },
});
export default AddTodo;
