import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { Divider, Grid, Typography } from '@mui/material';

import { TOpeningHours } from '../../types/cafe';
import FormTimeField from '../common/FormComponets/FormTimeField';

type TOpeningHoursProps = {
  openingHours: TOpeningHours;
  update: any;
};

const OpenedTimeCard: React.FC<TOpeningHoursProps> = ({openingHours, update}) => {
  const { t } = useTranslation();

  const days = [
    {
      openValue: 'mondayOpen',
      closeValue: 'mondayClose',
      label: t('days.monday'),
    },
    {
      openValue: 'tuesdayOpen',
      closeValue: 'tuesdayClose',
      label: t('days.tuesday')
    },
    {
      openValue: 'wednesdayOpen',
      closeValue: 'wednesdayClose',
      label: t('days.wednesday'),
    },
    {
      openValue: 'thursdayOpen',
      closeValue: 'thursdayClose',
      label: t('days.thursday'),
    },
    {
      openValue: 'fridayOpen',
      closeValue: 'fridayClose',
      label: t('days.friday'),
    },
    {
      openValue: 'saturdayOpen',
      closeValue: 'saturdayClose',
      label: t('days.saturday'),
    },
    {
      openValue: 'sundayOpen',
      closeValue: 'sundayClose',
      label: t('days.sunday'),
    }
  ]

  const handleChange = (fieldName: string, updatedValue: TOpeningHours) => {
    update(fieldName, updatedValue);
  };

  const methods = useForm({
    defaultValues: {
      mondayOpen: openingHours.mondayOpen,
      mondayClose: openingHours.mondayClose,
      tuesdayOpen: openingHours.tuesdayOpen,
      tuesdayClose: openingHours.tuesdayClose,
      wednesdayOpen: openingHours.wednesdayOpen,
      wednesdayClose: openingHours.wednesdayClose,
      thursdayOpen: openingHours.thursdayOpen,
      thursdayClose: openingHours.thursdayClose,
      fridayOpen: openingHours.fridayOpen,
      fridayClose: openingHours.fridayClose,
    },
    mode: 'onSubmit',
  })
  const { control } = methods;

  return (
    <>
      { days.map((day, index) => {
        return (
          <Grid  item xs={12} key={index} className="flex justify-center">
            <Grid container className="flex pl-4" gap={1}>
              <Grid item xs={12} sm={3} className='flex justify-start items-center'>
                <Typography variant="body2">{ day.label}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormTimeField
                  label={t('dialog.from')}
                  name={t(`${day.openValue}`)}
                  control={control}
                  required={false}
                  onChange={(value) => handleChange(day.openValue, value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormTimeField
                  label={t('dialog.to')}
                  name={t(`${day.closeValue}`)}
                  control={control}
                  required={false}
                  onChange={(value) => handleChange(day.closeValue, value)}
                />
              </Grid>
              <Divider flexItem className="sm:hidden" />
            </Grid>
            <DevTool control={control} />
          </Grid >
        )
      })
      }</>
  )
};

export default OpenedTimeCard;
