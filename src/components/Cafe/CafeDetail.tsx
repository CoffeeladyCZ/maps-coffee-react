import { faClock, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../common/Map/AppMap';

import axios from 'axios';

import './CafeDetail.scss';

import { CurrentCafeType } from '../../contexts/MapsContext';

type ParamsType = {
cafename: string;
}

const CafeDetail: React.FC = () => {
  const [cafeDetail, setCafeDetail] = useState<CurrentCafeType | null>(null);
  const { cafename } = useParams<ParamsType>();

  const baseURL = `http://localhost:5000/api/cafe/${cafename}/`

  useEffect(() => {
    const getCafeDetail = async () => {
      let response
      try {
        response = await axios.get(baseURL);
        const fetchData: CurrentCafeType = await response.data;
        setCafeDetail(fetchData);
      }
      catch (error) {
        console.log(error.message);
      }
    }
    getCafeDetail();
  }, [setCafeDetail, baseURL]);


  if (!cafeDetail) {
    return <h1>Tato kavárna pravděpodobně neexistuje!</h1>
  }

  const {
    address,
    image,
    name,
    time,
    phone,
    web,
  } = cafeDetail;

  return (
    <div className='detail'>
      {image && (
        <div className='detail-header'>
          <img src={image[0]} alt={name} />
        </div>
      )}
      <h2>{name}</h2>
      <div className='detail-wrapper'>
        <div className='detail-wrapper-info'>
          <div className='detail-wrapper__address'>{address}</div>
          {time && (
            <div className='detail-wrapper-info__time'>
              <FontAwesomeIcon
                icon={faClock}
                size='sm'
                className='clock-icon'
              />
              {time}
            </div>
          )}
          <div className='detail-wrapper-info__phone'>
            <FontAwesomeIcon icon={faPhone} size='sm' className='icon' />
            {phone}
          </div>
          {web && (
            <div className='detail-wrapper-info__web'>
              <FontAwesomeIcon icon={faGlobe} size='sm' className='icon' />
              <a href={web}>{web}</a>
            </div>
          )}
        </div>
        <div className='detail-wrapper-box'>
          <div className='detail-wrapper-box__map'>
            <Map height='300' />
          </div>
          <div className='detail-wrapper-box__images'>
            {
              image &&
              image.map((item, index) => {
                return <img key={ index } alt={ name } src={ item } />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeDetail;
