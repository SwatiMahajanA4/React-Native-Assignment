import React from 'react';
import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  FC,
  useState,
} from 'react';
import service from '../services/service';

interface DataContextProps {
  children: ReactNode;
}

export interface ResultType {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
  status: string;
}

interface SortedType {
  city: string;
  shifts: Array<ResultType>;
}

interface DataContextType {
  allShifts: Array<ResultType>;
  setAllShifts: Dispatch<SetStateAction<Array<ResultType>>>;
  bookedShifts: Array<ResultType>;
  setBookedShifts: Dispatch<SetStateAction<Array<ResultType>>>;
  sortedData: Array<SortedType>;
  setSortedData: Dispatch<SetStateAction<Array<SortedType>>>;
  myShiftsView: boolean;
  setMyShiftsView: Dispatch<SetStateAction<boolean>>;
  selectedCity: number;
  setSelectedCity: Dispatch<SetStateAction<number>>;
}

export const DataContext = createContext<DataContextType>({
  allShifts: [],
  setAllShifts: () => {},
  bookedShifts: [],
  setBookedShifts: () => {},
  sortedData: [],
  setSortedData: () => {},
  myShiftsView: true,
  setMyShiftsView: () => {},
  selectedCity: 0 || 1 || 2,
  setSelectedCity: () => {},
});

export const DataContextProvider: FC<DataContextProps> = ({children}) => {
  const [allShifts, setAllShifts] = useState<Array<ResultType>>([]);
  const [bookedShifts, setBookedShifts] = useState<Array<ResultType>>([]);
  const [sortedData, setSortedData] = useState<Array<SortedType>>([]);
  const [myShiftsView, setMyShiftsView] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<number>(0);

  const handleOnChange = async () => {
    try {
      const response = await service.get('/shifts');
      if (response.data) {
        setAllShifts(response.data);
      }
      return response;
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    !!allShifts && handleOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        allShifts,
        setAllShifts,
        sortedData,
        setSortedData,
        myShiftsView,
        setMyShiftsView,
        selectedCity,
        setSelectedCity,
        bookedShifts,
        setBookedShifts,
      }}>
      {children}
    </DataContext.Provider>
  );
};
