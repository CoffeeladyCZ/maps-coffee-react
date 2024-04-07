import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Map from '../../components/common/Map/AppMap';
import CafeList from '../../components/Cafe/CafeList';
import Navigation from '../../components/Navigation/AppNavigation';

import { getCafeList } from '../../apiMethods';
import { setCafes } from '../../store/cafeList';
import SimpleAlert from '../../components/common/SimpleAlert/SimpleAlert';
import { useTranslation } from 'react-i18next';

interface MapProps {
  height: string;
}

const Home: React.FC<MapProps> = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const setCafeList = async () => {
      setIsLoading(true);
      try {
        const response = await getCafeList('/api/cafe/list');
        if (response) {
          dispatch(setCafes(response));
        }
      } catch (err) {
        setOpenAlert(true);
      } finally {
        setIsLoading(false);
      }
    };

    setCafeList();
  }, [dispatch]);


  return (
    <div className="flex flex-col">
      <Navigation />
      <Map height='350' detailCafe={false} />
      <CafeList isLoading={isLoading} />
      <SimpleAlert
        open={openAlert}
        message={t('errors.somethingWrong')}
        severity="error"
        onCloseAlert={() => setOpenAlert(false)}
      />
    </div>
  )
}

export default Home;
