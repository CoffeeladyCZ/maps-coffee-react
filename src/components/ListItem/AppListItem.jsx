import React from 'react';
import { Link } from "react-router-dom";
import ModalWindow from '../../common/ModalWindow/ModalWindow';
import { useActualCoffeeHouseContext, useCurrentCafeContext, useModalOpenedContext, useOpenModalContext } from '../../contexts/MapsContext';
import ModalContent from '../ModalContent/ModalContent';

import './AppListItem.scss';

const ListItem = ({ activeCoffee, coffeeHouseObject }) => {
  const { coffeeHouse, setCoffeeHouse } = useActualCoffeeHouseContext();
  const { setCurrentCafe } = useCurrentCafeContext();
  const { isOpened } = useModalOpenedContext();
  const open = useOpenModalContext();
  
  const showModal = () => {
    open();    
  }

  const setActualCafe = (name) => {
    setCurrentCafe(coffeeHouseObject);
    setCoffeeHouse(name);
  }

  const { address, name, time, image, content, slug } = coffeeHouseObject;

  const contentModal = <ModalContent name={name} address={address} time={time} image={image} />
  
  let modal;
  if (isOpened && name === coffeeHouse) {
    modal = <ModalWindow contentModal={contentModal} />
  }
  return(
    <div onClick={() => setActualCafe(name)} className={`coffee-list ${activeCoffee}`}>
      <Link to={`/cafe/${slug}`} className='list-name'>
        <h4 className='list-name'>{name}</h4>
      </Link>
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
