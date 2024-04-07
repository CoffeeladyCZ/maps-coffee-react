import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { setActualCafe } from '../../store/cafeDetail';

import { CircularProgress, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type CafeListProps = {
  isLoading: boolean;
}

const CafeList: React.FC<CafeListProps> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentLocation = useSelector((state: RootState) => state.locations.currentLocation);
  const cafeList = useSelector((state: RootState) => state.cafeList.cafeList);

  if (isLoading) {
    return ( <CircularProgress color='primary' />)
  }

  return (
    <>
      { cafeList === null ? (<Typography variant="body1">{t('dataNotExist')}</Typography>) :
        (<ImageList cols={4} rowHeight={200} gap={8}>
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
                <Link to={`/cafe/${item.slug}`}>
                  <ImageListItemBar
                    title={item.name}
                  />
                </Link>
              </ImageListItem>
            ))}
        </ImageList>)
      }
    </>
  )
}

export default CafeList;
