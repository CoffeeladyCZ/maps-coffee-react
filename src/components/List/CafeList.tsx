import React from 'react';
import { Link } from "react-router-dom";

import './CafeList.scss';

import { listCoffeehouse } from '../../data/data';
import { useActualCoffeeHouseContext, useMarkerDistrictContext, useCurrentCafeContext } from '../../contexts/MapsContext';
import image from '../../img/detail/tykavo.jpg';
import { CurrentCafeType } from '../../contexts/MapsContext'; // TODO Předělat do jiného souboru

const CafeList: React.FC = () => {
  const district = useMarkerDistrictContext();
  const { setCoffeeHouse } = useActualCoffeeHouseContext();
  const { setCurrentCafe } = useCurrentCafeContext();

  const setActualCafe = (item: CurrentCafeType) => {
    setCoffeeHouse(item.name);
    setCurrentCafe(item);
  }

  return (
    <div className='listCafe'>
      {
        listCoffeehouse.filter(coffeehouse => coffeehouse.district.includes(district))
          .map(item => {
            return (
              <div key={ item.name } className="listCafe__cafe" onClick={() => setActualCafe(item)}>
                <Link to={`/cafe/${item.name}`} className='list-name'>
                  <img alt={ item.name } src={ image } className='listCafe__cafe-img' />
                  <div className='listCafe__cafe-title'>
                    <p>{ item.name }</p>
                  </div>
                </Link>
              </div>
            )
          })
      }
    </div>
  )
}

export default CafeList;
