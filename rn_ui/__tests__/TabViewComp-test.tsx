import 'react-native';
import React from 'react';
import TabViewComp from '../src/components/TabViewComp';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const data = [
    {area: 'Tokyo', length: 23},
    {area: 'Berlin', length: 15},
  ];

  const tabViewComp = renderer.create(<TabViewComp data={data} />).toJSON();
  expect(tabViewComp).toMatchSnapshot();
});
