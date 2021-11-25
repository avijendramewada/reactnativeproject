import React from 'react';
import {FlatList} from 'react-native';
 
const list ={[
 {day:"Monday"},
  {day:"Tuesday"},
   {day:"Wednesday"},
    {day:"Thusday"},
]}

const List = () =>(
   <FlatList 
    data={list}
    renderItem={({list}) =>(
        <Text>{list.day}</Text>
    )}
    />
)
export default List;