import {StyleSheet} from 'react-native';
import React from 'react';
import {HStack, NativeBaseProvider} from 'native-base';
import TabViewItem from './TabViewItem';

interface TabViewCompProps {
  data: Array<any>;
  footer?: boolean;
}

const TabViewComp = ({data, footer}: TabViewCompProps): JSX.Element => {
  const [selected, setSelected] = React.useState(0);
  return (
    <NativeBaseProvider>
      <HStack style={styles.footerBox}>
        {data?.map((item, index) => (
          <TabViewItem
            number={index}
            selected={selected}
            setSelected={setSelected}
            text={item}
            footer={footer}
            key={index}
          />
        ))}
      </HStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  footerBox: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
});

export default TabViewComp;
