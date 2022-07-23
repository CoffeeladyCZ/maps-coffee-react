import { createContext, useContext, useEffect, useState } from "react";

const PopUpContext = createContext();
const TogglePopUpContext = createContext();
const OpenPopUpContext = createContext();
const ClosePopUpContext = createContext();
const PopUpContextSubmit = createContext();
const PopUpContextSubmitted = createContext();

export function usePopUp() {
  return useContext(PopUpContext);
}
export function useTogglePopup() {
  return useContext(TogglePopUpContext);
}
export function useOpenPopup() {
  return useContext(OpenPopUpContext);
}
export function useClosePopup() {
  return useContext(ClosePopUpContext);
}
export function usePopUpContextSubmit() {
  return useContext(PopUpContextSubmit);
}
export function usePopUpContextSubmitted() {
  return useContext(PopUpContextSubmitted);
}

export function PopUpStateProvider({ children }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  function closePopUp() {
    setIsOpened(false);
  }
  function openPopUp() {
    setIsOpened(true);
  }
  function togglePopUp() {
    setIsOpened(!isOpened);
  }
  function submit() {
    setIsSubmited(true);
  }
  function closePopUpOutside(event) {
    const type = event.type;
    const isBodyClicked =
      type === "click" &&
      !event.target.matches(
        ".app-header .sighn-icon, .app-header .sighn-icon *, .pop-up, .pop-up *"
      );
    const isEscapePressed =
      type === "keyup" && event.key && event.key.toLowerCase() === "escape";

    if (isBodyClicked || isEscapePressed) {
      window.removeEventListener("click", closePopUpOutside);
      window.removeEventListener("keyup", closePopUpOutside);
      setIsOpened(false);
    }
  }

  function subscribe() {
    // při otevření popup zaregistrujeme odposlech kliku a keyup s moznost once: true t.j. eventHandler se muze spusit pouze jednou
    window.addEventListener("click", closePopUpOutside, { once: true });
    window.addEventListener("keyup", closePopUpOutside, { once: true });
  }

  function unsubscribe() {
    window.removeEventListener("click", closePopUpOutside);
    window.removeEventListener("keyup", closePopUpOutside);
    setIsOpened(false);
  }

  useEffect(() => unsubscribe, []);

  useEffect(() => {
    if (isOpened) {
      subscribe();
    }
  }, [isOpened]);

  return (
    <PopUpContext.Provider value={isOpened}>
      <TogglePopUpContext.Provider value={togglePopUp}>
        <OpenPopUpContext.Provider value={openPopUp}>
          <ClosePopUpContext.Provider value={closePopUp}>
            <PopUpContextSubmit.Provider value={isSubmited}>
              <PopUpContextSubmitted.Provider value={submit}>
                {children}
              </PopUpContextSubmitted.Provider>
            </PopUpContextSubmit.Provider>
          </ClosePopUpContext.Provider>
        </OpenPopUpContext.Provider>
      </TogglePopUpContext.Provider>
    </PopUpContext.Provider>
  );
}
