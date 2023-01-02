import React from 'react';

import ListItem from '../ListItem/AppListItem';
import './AppList.scss';

import { useActualCoffeeHouseContext, useMarkerDistrictContext } from '../../contexts/MapsContext';
import { listCoffeehouse } from '../../data/data';
import { slugify } from '../../Utils';

const List = () => {
  const location = useMarkerDistrictContext();
  const { coffeeHouse } = useActualCoffeeHouseContext();

  return (
    <div className='app-list'>
      {
        listCoffeehouse.filter(cafe => cafe.location.includes(location))
          .map(cafe => {
            const {name } = cafe;
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
