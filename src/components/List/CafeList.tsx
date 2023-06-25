import { Link } from 'react-router-dom';

import { useMarkerDistrictContext, useCurrentCafeContext, CurrentCafeType, useListCafesContext } from '../../contexts/MapsContext';
import { slugify } from '../../Utils';

import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';


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
    <ImageList cols={4} rowHeight={200} gap={8}>
      { listCafes && listCafes.filter(coffeehouse => coffeehouse.location.includes(location)).map((item) => (
        <ImageListItem key={item.name}  onClick={() => setActualCafe(item)}>
          <img
            alt={ item.name }
            src={`${item.image}?w=200&fit=crop&auto=format`}
            srcSet={`${item.image}?w=200&fit=crop&auto=format&dpr=2 2x`}
            loading='lazy'
          />
          <Link to={`/cafe/${slugify(item.name)}`}>
            <ImageListItemBar
              title={item.name}
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default CafeList;
