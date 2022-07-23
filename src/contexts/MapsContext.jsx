import { createContext, useContext, useState } from "react";

const MarkerContext = createContext();
const MarkerDistrictContext = createContext();
const ActiveMarkerContext = createContext();
const ActualDistrictContext = createContext();
const ActualCoffeeHouseContext = createContext();
const ModalOpenedContext = createContext();
const OpenModalContent = createContext();
const CurrentCafeContext = createContext();

export function MapsStateProvider({ children }) {
  const [isActive, setActive] = useState(false);
  const [district, setDistrict] = useState("All");
  const [coffeeHouse, setCoffeeHouse] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [currentCafe, setCurrentCafe] = useState({});

  function active() {
    setActive(true);
  }

  function open() {
    setIsOpened(true);
  }

  function actualDistrict(name) {
    setDistrict(name);
    setActive(true);
  }
  
  return (
    <MarkerContext.Provider value={isActive}>
      <ActiveMarkerContext.Provider value={active}>
        <MarkerDistrictContext.Provider value={district}>
          <ActualDistrictContext.Provider value={actualDistrict}>
            <ActualCoffeeHouseContext.Provider value={{coffeeHouse, setCoffeeHouse}}>
              <ModalOpenedContext.Provider value={{isOpened, setIsOpened}}>
                <OpenModalContent.Provider value={open}>
                  <CurrentCafeContext.Provider value={{currentCafe, setCurrentCafe}}>
                    {children}
                  </CurrentCafeContext.Provider>
                </OpenModalContent.Provider>
              </ModalOpenedContext.Provider>
            </ActualCoffeeHouseContext.Provider>
          </ActualDistrictContext.Provider>
        </MarkerDistrictContext.Provider>
      </ActiveMarkerContext.Provider>
    </MarkerContext.Provider>
  );
}

export const useMarkerContext = () => useContext(MarkerContext);
export const useMarkerDistrictContext = () => useContext(MarkerDistrictContext);
export const useActiveMarkerContext = () => useContext(ActiveMarkerContext);
export const useActualDistrictContent = () => useContext(ActualDistrictContext);
export const useActualCoffeeHouseContext = () => useContext(ActualCoffeeHouseContext);
export const useModalOpenedContext = () => useContext(ModalOpenedContext);
export const useOpenModalContext = () => useContext(OpenModalContent);
export const useCurrentCafeContext = () => useContext(CurrentCafeContext);
