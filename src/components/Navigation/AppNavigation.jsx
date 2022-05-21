import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './AppNavigation.scss';
import { useActiveMarkerContext, useActualDistrictContent, useMarkerDistrictContext } from '../../contexts/MapsContext';


const cityDistrict = [
  { name: 'All' },
  { name: 'Letná' },
  { name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
];

const Navigation = () => {
  const active = useActiveMarkerContext();
  const district = useMarkerDistrictContext();
  const actualDistrict = useActualDistrictContent();

  return (
    <div className='navigation'>
      <ul className='navigation-menu'>
        {
          cityDistrict.map((item) =>
          <li 
            className={active && item.name === district ? 'active' : ''} 
            key={item.name} 
            onClick={() => actualDistrict(item.name)}>
            {item.name}
          </li>
          )
        }
        <Link to="form" className='navigation-menu__icon'>
          <FontAwesomeIcon icon={faPlus} size="lg"/>
            <span className='navigation-menu__icon-text'>New</span>
        </Link>
      </ul>
    </div>
  );
}

export default Navigation;
