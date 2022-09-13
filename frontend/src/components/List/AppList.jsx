import React from 'react';

import ListItem from '../ListItem/AppListItem';
import './AppList.scss';

import { useActualCoffeeHouseContext, useMarkerDistrictContext } from '../../contexts/MapsContext';
import { listCoffeehouse } from '../../data/data';
import { slugify } from '../../Utils';

const List = () => {
  const district = useMarkerDistrictContext();
  const { coffeeHouse } = useActualCoffeeHouseContext();

  return (
    <div className='app-list'>
      {
        listCoffeehouse.filter(cafe => cafe.district.includes(district))
        .map(cafe => {
          const {name, address, time, image, content } = cafe;
          const slug = name && slugify(name);
          return <ListItem
            key={ name }
            activeCoffee={ coffeeHouse === name ? 'active-class' : '' }
            coffeeHouseObject={{
              ...cafe,
              slug: slug,
              phone: cafe.phone,
              web: cafe.web
            }}
          />
        }
      )}
    </div>
  )
}

export default List;
