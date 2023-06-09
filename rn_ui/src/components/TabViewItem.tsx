import {StyleSheet} from 'react-native';
import React from 'react';
import {Center, Pressable, Text} from 'native-base';
import {DataContext} from '../context/dataContext';

interface TabViewItemProps {
  number: number;
  selected: number;
  setSelected: (number: number) => void;
  text: any;
}

const TabViewItem = ({
  number,
  selected,
  setSelected,
  text,
}: TabViewItemProps) => {
  const {setSelectedCity} = React.useContext(DataContext);
  return (
    <Pressable
      opacity={selected === number ? 1 : 0.5}
      py="3"
      flex={1}
      onPress={() => {
        setSelectedCity(number);
        setSelected(number);
      }}>
      <Center>
        <Text style={[styles.text]}>{`${text.area} (${text.length})`}</Text>
      </Center>
    </Pressable>
  );
};

export default TabViewItem;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#004FB4',
  },
});
