import React from 'react';

import ListItem from '../ListItem/AppListItem';

import { listCoffeehouse } from '../../data/data';
import { useActualCoffeeHouseContext, useMarkerDistrictContext } from '../../contexts/MapsContext';

const List = () => {
  const district = useMarkerDistrictContext();
  const { coffeeHouse } = useActualCoffeeHouseContext();

  return (
    <div className='app-list'>
      {
        listCoffeehouse.filter(coffeehouse => coffeehouse.district.includes(district))
        .map(coffeehouse => {
           return <ListItem
            key={coffeehouse.name}
            name={coffeehouse.name}
            address={coffeehouse.address}
            time={coffeehouse.time}
            image={coffeehouse.image}
            content={coffeehouse.content}
            activeCoffee={coffeeHouse === coffeehouse.name ? 'active-class' : ''}
          />
        }
      )}
    </div>
  )
}

export default List;
