import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

import { useActiveMarkerContext, useActualDistrictContent, useMarkerDistrictContext } from '../../contexts/MapsContext';
import './AppNavigation.scss';

type CityDistrict = {
  name: string
}

type CityDistricts = CityDistrict[];

const cityDistrict: CityDistricts = [
  { name: 'All' },
  { name: 'Letná' },
  { name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
];

const Navigation: React.FC = () => {
  const active = useActiveMarkerContext();
  const district = useMarkerDistrictContext();
  const actualDistrict = useActualDistrictContent();

  return (
    <div className='navigation'>
      <ul className='navigation-menu'>
        {
          cityDistrict.map((item) =>
          <li 
            className={active() && item.name === district ? 'active' : ''} 
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
