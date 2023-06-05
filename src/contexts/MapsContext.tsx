import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultVoid = () => {};
const defaultCafeType = {
  address: '',
  content: '',
  location: [],
  lat: 0,
  lng: 0,
  name: '',
  time: ''
};

const defaultCafesListType: CurrentCafeType[] = [];

export type CurrentCafeType = {
  name: string;
  address?: string;
  time: string;
  phone?: string;
  web?: string;
  location: string[];
  image?: string[];
  type?: string;
  content?: string;
  lat: number;
  lng: number;
};


export type ActiveDistrictContextSetter = (() => void | Promise<void>);
export type ActualDistrictContextSetter =
  | ((name: string) => void | Promise<void>)
 ;

export type OpenModalContentSetter = (() => void | Promise<void>);

export type ActualCoffeeHouseContextType = {
  coffeeHouse: string;
  setCoffeeHouse: React.Dispatch<React.SetStateAction<string>>;
};

export type ModalOpenedContextType = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CurrentCafeContextType = {
  currentCafe: CurrentCafeType;
  setCurrentCafe: React.Dispatch<React.SetStateAction<CurrentCafeType>>;
};

export type ListCafesContextType = {
  listCafes: CurrentCafeType[];
  setListCafes: React.Dispatch<React.SetStateAction<CurrentCafeType[]>>;
};

export type ActiveMarkerContextType = {
  active: ActiveDistrictContextSetter;
};

const MarkerContext = createContext<boolean>(false);
const MarkerDistrictContext = createContext<string>('');
const ActiveMarkerContext = createContext<ActiveMarkerContextType>({active: defaultVoid});
const ActualDistrictContext = createContext<ActualDistrictContextSetter>(defaultVoid);
const ActualCoffeeHouseContext = createContext<ActualCoffeeHouseContextType>({
  coffeeHouse: '',
  setCoffeeHouse: defaultVoid
});
const ModalOpenedContext = createContext<ModalOpenedContextType>({
  isOpened: false,
  setIsOpened: defaultVoid
});
const OpenModalContent = createContext<OpenModalContentSetter>(defaultVoid);
const CurrentCafeContext = createContext<CurrentCafeContextType>({
  currentCafe: defaultCafeType,
  setCurrentCafe: defaultVoid
});
const ListCafesContext = createContext<ListCafesContextType>({
  listCafes: defaultCafesListType,
  setListCafes: defaultVoid
});

export const MapsStateProvider: React.FC = ({ children }) => {
  const [isActive, setActive] = useState(false);
  const [location, setLocation] = useState('All');
  const [coffeeHouse, setCoffeeHouse] = useState<string>('');
  const [isOpened, setIsOpened] = useState(false);
  const [currentCafe, setCurrentCafe] = useState<CurrentCafeType>(defaultCafeType);
  const [listCafes, setListCafes] = useState<CurrentCafeType[]>([]);

  function active() {
    setActive(true);
  }

  function open() {
    setIsOpened(true);
  }

  function actualDistrict(name: string) {
    setLocation(name);
    setActive(true);
  }

  const activeContextValue: ActiveMarkerContextType = {
    active: active,
  };

  return (
    <ListCafesContext.Provider value={{ listCafes, setListCafes }}>
      <MarkerContext.Provider value={isActive}>
        <ActiveMarkerContext.Provider value={activeContextValue}>
          <MarkerDistrictContext.Provider value={location}>
            <ActualDistrictContext.Provider value={actualDistrict}>
              <ActualCoffeeHouseContext.Provider value={{ coffeeHouse, setCoffeeHouse }}>
                <ModalOpenedContext.Provider value={{ isOpened, setIsOpened }}>
                  <OpenModalContent.Provider value={open}>
                    <CurrentCafeContext.Provider value={{ currentCafe, setCurrentCafe }}>
                      {children}
                    </CurrentCafeContext.Provider>
                  </OpenModalContent.Provider>
                </ModalOpenedContext.Provider>
              </ActualCoffeeHouseContext.Provider>
            </ActualDistrictContext.Provider>
          </MarkerDistrictContext.Provider>
        </ActiveMarkerContext.Provider>
      </MarkerContext.Provider>
    </ListCafesContext.Provider>
  );
};

export const useListCafesContext = () => useContext(ListCafesContext);
export const useMarkerContext = () => useContext(MarkerContext);
export const useMarkerDistrictContext = () => useContext(MarkerDistrictContext);
export const useActiveMarkerContext = () => useContext(ActiveMarkerContext);
export const useActualDistrictContent = () => useContext(ActualDistrictContext);
export const useActualCoffeeHouseContext = () => useContext(ActualCoffeeHouseContext);
export const useModalOpenedContext = () => useContext(ModalOpenedContext);
export const useOpenModalContext = () => useContext(OpenModalContent);
export const useCurrentCafeContext = () => useContext(CurrentCafeContext);
