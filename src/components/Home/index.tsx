import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Map from '../../common/Map/AppMap';
import CafeList from '../Cafe/CafeList';
import Navigation from '../Navigation/AppNavigation';

import { getCafeList } from '../../Utils/apiUtils';
import { setCafes } from '../../store/cafeList';

interface MapProps {
  height: string;
}

const Home: React.FC<MapProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setCafeList();
  }, []);

  const setCafeList = async() => {
    try {
      const response = await getCafeList('/cafe/list');
      if (response) {
        dispatch(setCafes(response));
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navigation />
      <Map height='350' detailCafe={false} />
      <CafeList />
    </>
  )
}

export default Home;
