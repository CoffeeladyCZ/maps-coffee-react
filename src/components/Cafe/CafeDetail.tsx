import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Grid, Skeleton } from '@mui/material';
import { LocalCafeOutlined } from '@mui/icons-material';

import { getCafeDetailData } from '../../Utils/apiUtils';
import { setCafeDetail } from '../../store/cafeDetail';
import { RootState } from '../../store';
import 'tailwindcss/tailwind.css';

import Map from '../../common/Map/AppMap';
import { openTime } from '../../types/cafe';

type ParamsType = {
id: string;
}

const CafeDetail: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<ParamsType>();


  const dispatch = useDispatch();
  const cafeDetail = useSelector((state: RootState) => state.cafeDetail.cafeDetail);

  const getCafeDetail = async() => {
    setIsLoading(true);
    try {
      const detail = await getCafeDetailData(`/cafe/${id}`);
      if (detail) {
        dispatch(setCafeDetail(detail));
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCafeDetail();
    return () => {
      setIsLoading(false);
    };
  }, [id]);

  if (!cafeDetail) {
    return <h1>{ t('notExist')}</h1>
  }

  const {
    address,
    description,
    opening_hours,
    name,
    contact,
  } = cafeDetail;

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" width={210} height={118} />
      ) : (
        <Grid container gap={1}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4">{name}</Typography>
          </Grid>
          <Grid item xs={12} sm={8} className="pb-6">
            <Typography variant="subtitle1">{ address.street }</Typography>
          </Grid>
          <Grid item xs={12} sm={8} className="pt-8 pb-8 border-y-2">
            <Grid container rowGap={2} columnGap={2}>
              <Grid item>
                <div className="bg-slate-100 rounded-md w-20 h-20 flex justify-center items-center">
                  <LocalCafeOutlined fontSize="large" />
                </div>
              </Grid>
              <Grid item>
                <div className="bg-slate-100 rounded-md w-20 h-20 flex justify-center items-center">
                  <LocalCafeOutlined fontSize="large" />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="pt-6">
            <Grid container className="mb-8">
              <Grid item xs={12}>
                <Typography variant="h6" className="pb-2 mb-8">{ t('detail.openTime') }</Typography>
              </Grid>
              {opening_hours && opening_hours.map((item: openTime, index: number) => {
                return (
                  <Grid container gap={1} className="flex-row" key={index}>
                    <Grid item xs={12} sm={2} md={1}>
                      <Typography variant="body1">{ t(`detail.days.${item.day_of_week}`)}:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={9} md={10}>
                      <Typography variant="body1">{`${item.open_time} - ${item.close_time}`}</Typography>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
            <Grid item className="pt-6">
              <Grid container className="mb-8">
                <Grid item xs={12} className="pb-2">
                  <Typography variant='h6'>{ t('detail.contacts') }</Typography>
                </Grid>
                <Grid item xs={12}>
                  <a className="hover:underline tracking-normal" href={contact.web}>{contact.web}</a>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">{ `${t('detail.phone')}: ${contact.phone || '-' }` }</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container className="mb-8">
                <Grid item xs={12} className="pb-2">
                  <Typography variant='h6'>{ t('detail.description') }</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>{description}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container className="mb-8">
              <Grid item xs={12} className="pb-2">
                <Typography variant='h6'>{ t('detail.location') }</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{ `${address.street}, ${address.city}, ${address.post_code}`}</Typography>
              </Grid>
            </Grid>
            <Map height='300' detailCafe />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CafeDetail;
