import React  from 'react';
import { useActualCoffeeHouseContext, useModalOpenedContext, useOpenModalContext } from '../../contexts/MapsContext';
import ModalWindow from '../Modal/ModalWindow';
import ModalContent from '../ModalContent/ModalContent';

import './AppListItem.scss';

const ListItem = ({ name, address, time, content, image, activeCoffee }) => {
  const { setCoffeeHouse } = useActualCoffeeHouseContext();
  const { isOpened } = useModalOpenedContext();
  const open = useOpenModalContext();

  const showModal = () => {
    open();
  }

  const contentModal = <ModalContent name={name} address={address} time={time} image={image} />
  
  let modal;
  if (isOpened) {
    modal = <ModalWindow contentModal={contentModal} />
  }
  return(
    <div onClick={() => setCoffeeHouse(name)} className={`coffee-list ${activeCoffee}`}>
      <h4 className='list-name'>{name}</h4>
      <p className='list-adress'>{address}</p>
      <p className='list-time'>{time}</p>
      <div className='list-container'>
        <div className='list'>
          <p className='list-title' onClick={showModal}>Další informace</p>
          <p className='list-text'>{content}</p>
        </div>
      </div>
      {modal}
    </div>
  )
}

export default ListItem;
