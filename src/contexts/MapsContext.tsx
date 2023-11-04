import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultVoid = () => {};
const defaultCafeType = {
  name: '',
  address: {},
  description: '',
  opening_time: [],
  contact: {},
  phone: '',
  location: [],
  image: [],
  coordinates: {}
};

const defaultCafesListType: CafeDetailResponse[] = [];

type openTime = {
  day_of_week: string;
  open_time: string;
  close_time: string;
}

type addressType = {
  street: string;
  city: string;
  post_code: string;
}

type coordintesType = {
  lat: string;
  lng: string;
}

export type CafeDetailResponse = {
  name: string;
  address?: addressType[];
  description: string;
  opening_hours: openTime[];
  phone?: string;
  web?: string;
  location: string[];
  image?: string[];
  coordinates: coordintesType;
};


export type ActiveDistrictContextSetter = (() => void | Promise<void>);
export type ActualDistrictContextSetter =
  | ((name: string) => void | Promise<void>)
 ;

export type OpenModalContentSetter = (() => void | Promise<void>);

export type ModalOpenedContextType = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CurrentCafeContextType = {
  currentCafe: CafeDetailResponse;
  setCurrentCafe: React.Dispatch<React.SetStateAction<CafeDetailResponse>>;
};

export type ListCafesContextType = {
  listCafes: CafeDetailResponse[];
  setListCafes: React.Dispatch<React.SetStateAction<CafeDetailResponse[]>>;
};

export type ActiveMarkerContextType = {
  active: ActiveDistrictContextSetter;
};

const MarkerContext = createContext<boolean>(false);
const MarkerDistrictContext = createContext<string>('');
const ActiveMarkerContext = createContext<ActiveMarkerContextType>({active: defaultVoid});
const ActualDistrictContext = createContext<ActualDistrictContextSetter>(defaultVoid);
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
  const [isOpened, setIsOpened] = useState(false);
  const [currentCafe, setCurrentCafe] = useState<CafeDetailResponse>(defaultCafeType);
  const [listCafes, setListCafes] = useState<CafeDetailResponse[]>([]);

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
              <ModalOpenedContext.Provider value={{ isOpened, setIsOpened }}>
                <OpenModalContent.Provider value={open}>
                  <CurrentCafeContext.Provider value={{ currentCafe, setCurrentCafe }}>
                    {children}
                  </CurrentCafeContext.Provider>
                </OpenModalContent.Provider>
              </ModalOpenedContext.Provider>
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
export const useModalOpenedContext = () => useContext(ModalOpenedContext);
export const useOpenModalContext = () => useContext(OpenModalContent);
export const useCurrentCafeContext = () => useContext(CurrentCafeContext);
