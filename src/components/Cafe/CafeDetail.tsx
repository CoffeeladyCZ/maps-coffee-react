import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../common/Map/AppMap';

import axios from 'axios';

import './CafeDetail.scss';

import { CurrentCafeType } from '../../contexts/MapsContext';
import { Grid, Typography } from '@mui/material';
import { AccessTime, Public, Phone } from '@mui/icons-material';

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
    description,
    image,
    name,
    time,
    phone,
    web,
  } = cafeDetail;

  return (
    <Grid container rowSpacing={1} className='detail'>
      {image && (
        <Grid item xs={12} className='detail-header'>
          <img src={image[0]} alt={name} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="h1" className="title">{name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} className='detail-wrapper'>
          <Grid item xs={12} sm={6}>
            <div className='detail-wrapper-info'>
              <div className='detail-wrapper__address'>{address}</div>
              {time && (
                <div className='detail-wrapper-info__time'>
                  <AccessTime fontSize='small' className="icon" />

                  {time}
                </div>
              )}
              <span className='detail-wrapper-info__phone'>
                <Phone fontSize='small' className='icon' />
                {phone}
              </span>
              {web && (
                <span className='detail-wrapper-info__web'>
                  <Public fontSize='small' className='icon' />
                  <a href={web}>{web}</a>
                </span>
              )}
              {description && (
                <span className='detail-wrapper-info__web'>
                  <Public fontSize='small' className='icon' />
                  {description}
                </span>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} className='detail-wrapper-box__map'>
                <Map height='300' />
              </Grid>
              <Grid item xs={12} className='detail-wrapper-box__images'>
                {
                  image &&
                  image.map((item, index) => {
                    return <img key={ index } alt={ name } src={ item } />
                  })
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default CafeDetail;
