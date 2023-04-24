import 'react-native';
import React from 'react';
import TabViewItem from '../src/components/TabViewItem';

import renderer from 'react-test-renderer';
import {NativeBaseProvider} from 'native-base';

test('renders correctly', () => {
  const selectedFn = jest.fn();
  const text = {area: 'Tokyo', length: 23};

  const tabViewItem = renderer
    .create(
      <NativeBaseProvider>
        <TabViewItem
          number={1}
          selected={0}
          setSelected={selectedFn}
          text={text}
        />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tabViewItem).toMatchSnapshot();
});
