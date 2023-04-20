import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {DataContext, ResultType} from '../context/dataContext';
import ShiftsView from './ShiftsView';
import {findDay} from '../utils/constants';

interface ListViewProps {
  shifts: Array<ResultType>;
  myShift: boolean;
}

const ListView = ({shifts, myShift}: ListViewProps): JSX.Element => {
  const {selectedCity, setMyShiftsView} = React.useContext(DataContext);
  const [datesArr, setDatesArr] = React.useState<Array<string>>([]);
  const [dateSortedShifts, setDateSortedShifts] = React.useState<Array<any>>(
    [],
  );

  const date = new Date();
  const nextDate = new Date();

  const today = findDay(date);
  const tomorrow = findDay(nextDate.setDate(date.getDate() + 1));

  const getAllDates = () => {
    const dates = shifts?.map(item => {
      return findDay(new Date(item.startTime));
    });
    setDatesArr([...new Set(dates)]);
  };

  const sortShifts = () => {
    const data = datesArr.map(value => {
      const theDay =
        value === today ? 'Today' : value === tomorrow ? 'Tomorrow' : value;
      const temp = shifts
        .filter(item => {
          return findDay(item.startTime) === value;
        })
        .sort((a, b) => a.startTime - b.startTime);
      return {day: theDay, theDayShifts: temp};
    });
    setDateSortedShifts(data);
  };

  React.useEffect(() => {
    getAllDates();
    setMyShiftsView(myShift);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, shifts, myShift]);

  React.useEffect(() => {
    sortShifts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datesArr]);

  return dateSortedShifts.length !== 0 ? (
    <View style={styles.flatListComp}>
      <FlatList
        data={dateSortedShifts}
        renderItem={({item}) => <ShiftsView value={item} />}
      />
    </View>
  ) : (
    <></>
  );
};

export default ListView;

const styles = StyleSheet.create({
  flatListComp: {flex: 1},
});
