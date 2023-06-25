import React, { createContext, useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultVoid = () => {};

export type TogglePopUpContextSetter = (() => void | Promise<void>);
export type OpenPopUpContextSetter = (() => void | Promise<void>);
export type ClosePopUpContextSetter = (() => void | Promise<void>);
export type PopUpContextSubmittedSetter = (() => void | Promise<void>);

const PopUpContext = createContext<boolean>(false);
const TogglePopUpContext = createContext<TogglePopUpContextSetter>(defaultVoid);
const OpenPopUpContext = createContext<OpenPopUpContextSetter>(defaultVoid);
const ClosePopUpContext = createContext<ClosePopUpContextSetter>(defaultVoid);
const PopUpContextSubmit = createContext<boolean>(false);
const PopUpContextSubmitted = createContext<PopUpContextSubmittedSetter>(defaultVoid);


export const PopUpStateProvider: React.FC = ({ children }) => {
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
  function closePopUpOutside(event: MouseEvent | KeyboardEvent): void {
    const type = event.type;
    const target = event.target as Element;
    const isBodyClicked =
    type === 'click' &&
    !target.matches(
      '.app-header .sign-icon, .app-header .sighn-icon *, .pop-up, .pop-up *'
    );
    const isEscapePressed: boolean | string =
      type === 'keyup' && (event as KeyboardEvent).key && (event as KeyboardEvent).key.toLowerCase() === 'escape';

    if (isBodyClicked || isEscapePressed) {
      window.removeEventListener('click', closePopUpOutside);
      window.removeEventListener('keyup', closePopUpOutside);
      setIsOpened(false);
    }
  }

  function subscribe() {
    // při otevření popup zaregistrujeme odposlech kliku a keyup s moznost once: true t.j. eventHandler se muze spusit pouze jednou
    window.addEventListener('click', closePopUpOutside, { once: true });
    window.addEventListener('keyup', closePopUpOutside, { once: true });
  }

  function unsubscribe() {
    window.removeEventListener('click', closePopUpOutside);
    window.removeEventListener('keyup', closePopUpOutside);
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

export const usePopUp = () => useContext(PopUpContext);
export const useTogglePopup = () => useContext(TogglePopUpContext);
export const useOpenPopup = () => useContext(OpenPopUpContext);
export const useClosePopup = () => useContext(ClosePopUpContext);
export const usePopUpContextSubmit = () => useContext(PopUpContextSubmit);
export const usePopUpContextSubmitted = () => useContext(PopUpContextSubmitted);