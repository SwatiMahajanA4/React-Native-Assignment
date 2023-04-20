import {StyleSheet, View} from 'react-native';
import React from 'react';
import ListView from '../components/ListView';
import {DataContext} from '../context/dataContext';

const MyShifts = () => {
  const {bookedShifts} = React.useContext(DataContext);

  return (
    <View style={styles.myShiftsView}>
      <View style={styles.listView}>
        <ListView shifts={bookedShifts} myShift={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myShiftsView: {
    flex: 1,
  },
  listView: {flex: 1},
});

export default MyShifts;
