import { faClock, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../common/Map/AppMap';
import { useTranslation } from "react-i18next";

import './CafeDetail.scss';

import { useCurrentCafeContext } from '../../contexts/MapsContext';
import { listCoffeehouse } from '../../data/data';
import { slugify } from '../../Utils';

type ParamsType = {
  cafename: string;
}

const CafeDetail: React.FC = () => {
  const { t } = useTranslation();
  let { currentCafe } = useCurrentCafeContext();
  const params = useParams<ParamsType>();
  let isCurrentCafe;
  if (!currentCafe.name) {
    const matchedCafe = listCoffeehouse.filter(cafe => slugify(cafe.name) === params.cafename);
    if (matchedCafe && matchedCafe.length && matchedCafe.length > 0 && matchedCafe[0]) {
      isCurrentCafe = false
    }
  }

  if (!isCurrentCafe) {
    return <h1>t("validation.error")</h1>
  }

  const {
    address,
    image,
    name,
    time,
    phone,
    web,
  } = currentCafe;

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
