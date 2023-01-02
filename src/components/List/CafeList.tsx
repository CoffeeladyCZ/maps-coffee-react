import { Link } from "react-router-dom";

import './CafeList.scss';

import { useMarkerDistrictContext, useCurrentCafeContext, CurrentCafeType, useListCafesContext } from '../../contexts/MapsContext';
import image from '../../img/detail/tykavo.jpg';
import { slugify } from '../../Utils';


const CafeList: React.FC = () => {
  const location = useMarkerDistrictContext();
  const { setCurrentCafe } = useCurrentCafeContext();
  const { listCafes } = useListCafesContext();

  const setActualCafe = (item: CurrentCafeType) => {
    setCurrentCafe(item);
  }

  if (!listCafes) {
    return (<div>Nic tu není</div>)
  }

  return (
    <div className='listCafe'>
      {
        listCafes && listCafes.filter(coffeehouse => coffeehouse.location.includes(location))
          .map((item: CurrentCafeType) => {
            return (
              <div key={ item.name } className="listCafe__cafe" onClick={() => setActualCafe(item)}>
                <Link to={`/cafe/${slugify(item.name)}`} className='list-name'>
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
