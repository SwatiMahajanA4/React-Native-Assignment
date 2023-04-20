import {StyleSheet, View} from 'react-native';
import React from 'react';
import {DataContext} from '../context/dataContext';
import TabViewComp from '../components/TabViewComp';
import ListView from '../components/ListView';

interface AvailableShiftsProps {}

const AvailableShifts = ({}: AvailableShiftsProps) => {
  const {allShifts, sortedData, setSortedData, selectedCity} =
    React.useContext(DataContext);
  const [tabData, setTabData] = React.useState<Array<any>>([]);
  let cityNames: any = [];

  const sortData = () => {
    setSortedData([]);
    setTabData([]);
    cityNames?.forEach((value: any) => {
      const filteredShifts = allShifts.filter(item => item.area === value);
      setSortedData(prev => [...prev, {city: value, shifts: filteredShifts}]);
      setTabData((prev: any) => [
        ...prev,
        {area: value, length: filteredShifts.length},
      ]);
    });
  };

  const filterCities = () => {
    let city = allShifts.map(item => {
      return item.area;
    });
    cityNames = [...new Set(city)];
  };

  React.useEffect(() => {
    allShifts.length !== 0 && filterCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allShifts]);

  React.useEffect(() => {
    cityNames.length !== 0 && sortData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityNames]);

  return Array.isArray(cityNames) && Array.isArray(sortedData) ? (
    <View style={styles.availableShiftsView}>
      <View style={styles.tabView}>
        <TabViewComp data={tabData} />
      </View>
      <View style={styles.listView}>
        <ListView shifts={sortedData?.[selectedCity]?.shifts} myShift={false} />
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  availableShiftsView: {
    flex: 1,
  },
  tabView: {flex: 1},
  listView: {flex: 15},
});

export default AvailableShifts;
