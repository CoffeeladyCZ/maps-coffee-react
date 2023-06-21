import React, { useEffect, useState } from "react";
import axios from 'axios';

import Map from "../../common/Map/AppMap";
import CafeList from "../List/CafeList";
import Navigation from '../Navigation/AppNavigation';

import { useListCafesContext, CurrentCafeType } from '../../contexts/MapsContext';

import './index.scss';
import { RotateLeft } from '@mui/icons-material';


interface MapProps {
  height: string;
}

const Home: React.FC<MapProps> = () => {
  const { setListCafes} = useListCafesContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const baseURL = 'http://localhost:5000/api/cafe/list';

  useEffect(() => {
    const getCafeList = async () => {
      let response
      try {
        response = await axios.get(baseURL);
        const fetchData: CurrentCafeType[] = await response.data;
        setListCafes(fetchData);
        setIsLoading(true);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    getCafeList();
  }, [setListCafes]);

  if (!isLoading) {
    return (
      <div>Nic tu zatím není
        <RotateLeft
          fontSize='small'
          className='loadIcon'
        />
      </div>
    )
  }
  return (
    <>
      <Navigation />
      <Map height="350" />
      <CafeList />
    </>
  )
}

export default Home;
