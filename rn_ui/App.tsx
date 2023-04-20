/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AvailableShifts from './src/screens/AvailableShifts';
import MyShifts from './src/screens/MyShifts';
import {DataContextProvider} from './src/context/dataContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <DataContextProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarIcon: () => {
                return null;
              },
              tabBarLabelPosition: 'beside-icon',
              tabBarLabelStyle: {fontSize: 16},
            }}>
            <Tab.Screen name="My Shifts" component={MyShifts} />
            <Tab.Screen name="Available Shifts" component={AvailableShifts} />
          </Tab.Navigator>
        </DataContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

// const styles = StyleSheet.create({
//   appView: {
//     flex: 1,
//   },
// });

export default App;
