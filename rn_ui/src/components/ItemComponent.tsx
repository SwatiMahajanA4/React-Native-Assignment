import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'native-base';
import {DataContext} from '../context/dataContext';
import {bookingStatus, date, hourFormat} from '../utils/constants';

interface ItemComponentProps {
  item: any;
  shiftsArr: any;
  handleBook: any;
  handleCancel: any;
}

const ItemComponent = ({
  item,
  handleBook,
  handleCancel,
}: ItemComponentProps): JSX.Element => {
  const {myShiftsView} = React.useContext(DataContext);

  return (
    <View style={styles.itemBox}>
      <View style={styles.textView}>
        <Text style={styles.timeText}>{`${hourFormat(
          item.startTime,
        )} - ${hourFormat(item.endTime)}`}</Text>
        {myShiftsView ? (
          <Text style={styles.areaText}>{item.area}</Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.statusAndButton}>
        <View style={styles.statusView}>
          <Text
            style={[
              styles.statusText,
              item?.status === bookingStatus.overlap && {color: '#E2006A'},
            ]}>
            {item?.status}
          </Text>
        </View>
        <Button
          variant="outlined"
          style={[
            styles.button,
            item.booked ? styles.cancelButton : styles.bookButton,
          ]}
          isDisabled={
            item.status === bookingStatus.overlap ||
            new Date(item.startTime) < date
              ? true
              : false
          }
          onPress={
            item.booked
              ? () => handleCancel(item.id)
              : () => handleBook(item.id)
          }>
          <Text
            style={
              item.booked ? styles.cancelButtonText : styles.bookButtonText
            }>
            {item.booked ? 'Cancel' : 'Book'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ItemComponent;

const styles = StyleSheet.create({
  itemBox: {
    borderWidth: 1,
    borderColor: '#cecece',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textView: {
    justifyContent: 'center',
  },
  timeText: {
    color: '#4F6C92',
  },
  areaText: {
    color: '#A4B8D3',
  },
  statusAndButton: {
    flexDirection: 'row',
  },
  statusView: {justifyContent: 'center', marginRight: 30},
  statusText: {},
  button: {
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  bookButton: {
    borderColor: '#55CB82',
  },
  cancelButton: {
    borderColor: '#FE93B3',
  },
  bookButtonText: {
    color: '#16A64D',
  },
  cancelButtonText: {
    color: '#E2006A',
  },
});
