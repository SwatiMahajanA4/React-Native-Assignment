import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemComponent from './ItemComponent';
import {DataContext} from '../context/dataContext';
import {bookingStatus} from '../utils/constants';

interface ShiftsViewProps {
  value: any;
}

const ShiftsView = ({value}: ShiftsViewProps): JSX.Element => {
  const {myShiftsView, allShifts, setAllShifts, bookedShifts, setBookedShifts} =
    React.useContext(DataContext);

  const totalHours = () => {
    const total = value.theDayShifts.reduce(
      (accu: number, currVal: any) =>
        accu +
        (new Date(currVal.endTime).getTime() -
          new Date(currVal.startTime).getTime()) /
          1000 /
          60 /
          60,
      0,
    );
    return total;
  };

  const getStatus = (booked: any, data: any) => {
    data.forEach((eachBooked: any) => {
      if (eachBooked.booked) {
        data.map((shift: any) => {
          if (shift?.id !== eachBooked.id && !shift.booked) {
            if (
              (shift.startTime < eachBooked.endTime &&
                shift.startTime >= eachBooked.startTime) ||
              (shift.endTime < eachBooked.endTime &&
                shift.endTime > eachBooked.startTime) ||
              (eachBooked.endTime < shift.endTime &&
                eachBooked.startTime > shift.startTime)
            ) {
              shift.status = bookingStatus.overlap;
            } else {
              shift.status = bookingStatus.none;
            }
          }
        });
      }
    });
  };

  const handleBook = (id: string) => {
    const tempArr = allShifts?.map(ele => {
      if (ele.id === id) {
        ele.booked = true;
        ele.status = bookingStatus.booked;
      } else if (!ele.booked && ele.status !== bookingStatus.overlap) {
        ele.status = bookingStatus.none;
      }
      return ele;
    });
    setAllShifts(tempArr);

    const tempBookedArr = allShifts?.filter(ele => {
      return ele.booked === true;
    });
    setBookedShifts(tempBookedArr);
    getStatus(tempBookedArr, value?.theDayShifts);
  };

  const handleCancel = (id: string) => {
    const tempArr = allShifts?.map(ele => {
      if (ele.id === id) {
        ele.booked = false;
        ele.status = bookingStatus.none;
      } else if (!ele.booked && ele.status === bookingStatus.overlap) {
        ele.status = bookingStatus.none;
      }
      return ele;
    });
    setAllShifts(tempArr);

    const tempModBookedArr = bookedShifts?.filter(ele => {
      return ele.booked === true;
    });
    setBookedShifts(tempModBookedArr);
    getStatus(tempModBookedArr, value?.theDayShifts);
  };

  return (
    <View style={styles.shiftsView}>
      <View style={styles.dayView}>
        <Text style={styles.dayText}>{value.day}</Text>
        {myShiftsView ? (
          <View style={styles.countTotalView}>
            <Text style={styles.countText}>
              {`${value.theDayShifts.length} ${
                value.theDayShifts.length === 1 ? 'Shift' : 'Shifts'
              }, ${totalHours()} h`}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <FlatList
        data={value.theDayShifts}
        renderItem={({item}) => (
          <ItemComponent
            item={item}
            shiftsArr={value.theDayShifts}
            handleBook={handleBook}
            handleCancel={handleCancel}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shiftsView: {flex: 1},
  dayView: {height: 50, flexDirection: 'row'},
  dayText: {
    color: '#4F6C92',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginLeft: 20,
  },
  countTotalView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  countText: {
    marginLeft: 30,
    color: '#A4B8D3',
  },
});

export default ShiftsView;
