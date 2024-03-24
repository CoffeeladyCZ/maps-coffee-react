import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Map from '../../components/Map/AppMap';
import CafeList from '../../components/Cafe/CafeList';
import Navigation from '../../components/Navigation/AppNavigation';

import { getCafeList } from '../../Utils/apiUtils';
import { setCafes } from '../../store/cafeList';

interface MapProps {
  height: string;
}

const Home: React.FC<MapProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setCafeList = async () => {
      try {
        const response = await getCafeList('/api/cafe/list');
        if (response) {
          dispatch(setCafes(response));
        }
      } catch (err) {
        console.error(err);
      }
    };

    setCafeList();
  }, [dispatch]);


  return (
    <div className="flex flex-col">
      <Navigation />
      <Map height='350' detailCafe={false} />
      <CafeList />
    </div>
  )
}

export default Home;
