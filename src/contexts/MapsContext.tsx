import { createContext, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultVoid = () => {};

export type ActiveDistrictContextSetter = (() => void | Promise<void>);
export type ActualDistrictContextSetter =
  | ((name: string) => void | Promise<void>)
 ;

export type OpenModalContentSetter = (() => void | Promise<void>);

export type ModalOpenedContextType = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
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

export const MapsStateProvider: React.FC = ({ children }) => {
  const [isActive, setActive] = useState(false);
  const [location, setLocation] = useState('All');
  const [isOpened, setIsOpened] = useState(false);

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
    <MarkerContext.Provider value={isActive}>
      <ActiveMarkerContext.Provider value={activeContextValue}>
        <MarkerDistrictContext.Provider value={location}>
          <ActualDistrictContext.Provider value={actualDistrict}>
            <ModalOpenedContext.Provider value={{ isOpened, setIsOpened }}>
              <OpenModalContent.Provider value={open}>
                {children}
              </OpenModalContent.Provider>
            </ModalOpenedContext.Provider>
          </ActualDistrictContext.Provider>
        </MarkerDistrictContext.Provider>
      </ActiveMarkerContext.Provider>
    </MarkerContext.Provider>
  );
};

export const useMarkerContext = () => useContext(MarkerContext);
export const useMarkerDistrictContext = () => useContext(MarkerDistrictContext);
export const useActiveMarkerContext = () => useContext(ActiveMarkerContext);
export const useActualDistrictContent = () => useContext(ActualDistrictContext);
export const useModalOpenedContext = () => useContext(ModalOpenedContext);
export const useOpenModalContext = () => useContext(OpenModalContent);
