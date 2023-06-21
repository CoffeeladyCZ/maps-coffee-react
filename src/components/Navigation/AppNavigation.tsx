import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

import { useActiveMarkerContext, useActualDistrictContent, useMarkerDistrictContext } from '../../contexts/MapsContext';
import './AppNavigation.scss';

type cityLocations = {
  name: string
}

type cityLocationss = cityLocations[];

const cityLocations: cityLocationss = [
  { name: 'All' },
  { name: 'Letná' },
  { name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
];

const Navigation: React.FC = () => {
  const activeContextValue = useActiveMarkerContext();
  const district = useMarkerDistrictContext();
  const actualDistrict = useActualDistrictContent();

  return (
    <div className='navigation'>
      <ul className='navigation-menu'>
        {
          cityLocations.map((item) => {
            const isActive = activeContextValue && item.name === district;

            return (
              <li
                className={isActive ? 'active' : ''}
                key={item.name}
                onClick={() => actualDistrict(item.name)}>
                {item.name}
              </li>
            );
          })}
        <Link to="form" className='navigation-menu__icon'>
          <AddIcon fontSize="large" />
          <span className='navigation-menu__icon-text'>New</span>
        </Link>
      </ul>
    </div>
  );
}

export default Navigation;
