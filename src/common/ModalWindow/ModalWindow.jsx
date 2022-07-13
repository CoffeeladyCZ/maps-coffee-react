import React, { useEffect } from 'react';
import './ModalWindow.scss';

import { useModalOpenedContext } from '../../contexts/MapsContext';

/**
 * ModalWindow
 * Modal window with custom content
 * @property {boolean=false} opened
 * @property {ReactComponent|HTMLElement|JSXComponent} content
 * @returns ModalWindow
 */
const ModalWindow = ({className, contentModal}) => {
  const {isOpened, setIsOpened} = useModalOpenedContext();

  if (!contentModal) {
    contentModal = <p>Nic tu není</p>;
  };

  const closeModal = e => {
    if (e.keyCode) {
      if (e.keyCode !== 27) return
    } else {
      e.preventDefault();
    }
    setIsOpened(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  const currentClass = `${className} modal-window`

  return (
    isOpened ? 
    <div className={currentClass}>
      <div className='modal-window-base'>
        <a 
          role='button' 
          href='www.' 
          className='modal-window-close'
          onClick={e => closeModal(e)} 
        >&times;</a>
        <div className='modal-window-content'>
          {contentModal}
        </div>
    </div>
  </div> : null
  );
}

export default ModalWindow;
