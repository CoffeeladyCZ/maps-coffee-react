import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { slugify } from '../../Utils';
import { RootState } from '../../store';
import { setActualCafe } from '../../store/cafeDetail';

import { CircularProgress, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

const CafeList: React.FC = () => {
  const dispatch = useDispatch();

  const currentLocation = useSelector((state: RootState) => state.locations.currentLocation);
  const cafeList = useSelector((state: RootState) => state.cafeList.cafeList);

  if (!cafeList) {
    return ( <CircularProgress color='primary' />)
  }

  return (
    <ImageList cols={4} rowHeight={200} gap={8}>
      {cafeList && cafeList
        .filter((coffeehouse) => currentLocation === 'All' || (coffeehouse.address && coffeehouse.address.location === currentLocation))
        .map((item) => (
          <ImageListItem key={item.name} onClick={() => dispatch(setActualCafe(item))}>
            <img
              alt={item.name}
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
