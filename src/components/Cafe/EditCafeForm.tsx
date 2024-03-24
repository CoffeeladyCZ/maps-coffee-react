import React, { useState, useEffect, useCallback } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { Button, Dialog, Divider, DialogContent, DialogTitle, Grid, DialogActions, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab/';

import { RootState } from '../../store';
import { FormValues, CafeDetailResponse, TOpeningHours, openTime } from '../../types/cafe';
import { setLocations } from '../../store/locations';
import { getLocationsData } from '../../Utils/apiUtils';
export { daysOfWeek } from '../../constants';

import { styled } from '@mui/material/styles';
import FormTextField from '../common/FormComponets/FormTextField';
import FormSelect from '../common/FormComponets/FormSelect';
import OpenedTimeCard from './OpenedTimeCard';
import { daysOfWeek } from '../../constants';

type FormNewCafeType ={
  openDialog: boolean;
  onClose: () => void;
  onFormData: (data: CafeDetailResponse) => void;
  isLoading: boolean;
  data: CafeDetailResponse;
};

const StyledForm = styled('form')`
  padding: 24px 32px;
  max-width: 900px;
`;

const EditCafeForm: React.FC<FormNewCafeType> = ({ openDialog, onClose, onFormData, isLoading, data }) => {
  const [isEditTime, setIsEditTime] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const locations = useSelector((state: RootState) => state.locations.locations);

  const [openingHours, setOpeningHours] = useState<TOpeningHours>({
    mondayOpen: '',
    mondayClose: '',
    tuesdayOpen: '',
    tuesdayClose: '',
    wednesdayOpen: '',
    wednesdayClose: '',
    thursdayOpen: '',
    thursdayClose: '',
    fridayOpen: '',
    fridayClose: '',
    saturdayOpen: '',
    saturdayClose: '',
    sundayOpen: '',
    sundayClose: '',
  });

  // Set the opening hours for each day from API to state
  const getOpeningDay = (day: string, openTime: string, closeTime: string) => {
    setOpeningHours((prevOpeningHours) => {
      return {
        ...prevOpeningHours,
        [day + 'Open']: openTime,
        [day + 'Close']: closeTime,
      };
    });
  };

  const methods = useForm<FormValues>({
    defaultValues: {
      location: data.address.location,
      name: data.name,
      web: data.contact.web || '',
      phone: data.contact.phone || '',
      street: data.address.street,
      city: data.address.city,
      postCode: data.address.post_code,
      lat: data.coordinates.lat.toString(),
      lng: data.coordinates.lng.toString(),
      description: data.description || '',
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
      saturdayOpen: openingHours.saturdayOpen,
      saturdayClose: openingHours.saturdayClose,
      sundayOpen: openingHours.sundayOpen,
      sundayClose: openingHours.sundayClose,
    },
    mode: 'onSubmit',
  })
  const { handleSubmit, control, reset, formState: { isValid, errors } } = methods;

  const fieldErrors = {
    name: errors.name,
    street: errors.street,
    city: errors.city,
    postCode: errors.postCode,
    lat: errors.lat,
    lng: errors.lng,
    web: errors.web,
    phone: errors.phone,
    description: errors.description,
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const openingHoursArray = daysOfWeek.map(day => ({
      day_of_week: day,
      open_time: openingHours[`${day}Open` as keyof TOpeningHours],
      close_time: openingHours[`${day}Close` as keyof TOpeningHours]
    }));

    const apiData: CafeDetailResponse = {
      name: values.name,
      address: {
        street: values.street,
        city: values.city,
        post_code: values.postCode,
        location: values.location,
      },
      contact: {
        web: values.web,
        phone: values.phone,
        email: values.email,
      },
      opening_hours: openingHoursArray,
      coordinates: {
        lat: parseFloat(values.lat),
        lng: parseFloat(values.lng),
      },
      description: values.description,
      slug: data.slug,
      image: data.image,
    }
    console.log('apiData', apiData)


    if (isValid) {
      onFormData(apiData);
      handleCloseDialog()
    }
  }

  const handleCloseDialog = () => {

    reset();
    setIsEditTime(false);
    onClose();
  };

  // Sets the opening hours from child component
  const handleOpeningHoursUpdate = (fieldName: string, updatedValue: Date) => {
    const formattedDateTime = dayjs(updatedValue).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    setOpeningHours({
      ...openingHours,
      [fieldName]: formattedDateTime,
    });
  };

  const getOpeningHours = useCallback((openingHours: openTime[]) => {
    openingHours.map((day) => {
      switch (day.day_of_week) {
      case 'monday':
        getOpeningDay('monday', day.open_time, day.close_time);
        break;
      case 'tuesday':
        getOpeningDay('tuesday', day.open_time, day.close_time);
        break;
      case 'wednesday':
        getOpeningDay('wednesday', day.open_time, day.close_time);
        break;
      case 'thursday':
        getOpeningDay('thursday', day.open_time, day.close_time);
        break;
      case 'friday':
        getOpeningDay('friday', day.open_time, day.close_time);
        break;
      case 'saturday':
        getOpeningDay('saturday', day.open_time, day.close_time);
        break;
      case 'sunday':
        getOpeningDay('sunday', day.open_time, day.close_time);
        break;
      }
    });
  }, []);

  useEffect(() => {
    getOpeningHours(data.opening_hours);
  }, [data.opening_hours, getOpeningHours]);

  const getLocations = useCallback(async() => {
    try {
      const response = await getLocationsData();
      if (response) {
        dispatch(setLocations(response));
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (locations === null) {
      getLocations()
    }
  }, [locations, getLocations]);

  return (
    <Dialog open={openDialog} maxWidth="xl">
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            <Typography className="text-red-800 font-bold uppercase text-2xl">{ t('dialog.editCafe')}</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2} columnGap={4} alignItems="flex-start" className="flex-row justify-center">
              <Grid container item md={5} spacing={2}>
                <Grid  item xs={12}>
                  <FormTextField
                    name='name'
                    label={t('dialog.nameCafe')}
                    errors={fieldErrors}
                    control={control}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="text-xl font-medium">{ t('dialog.address') }</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    name='street'
                    label={t('dialog.street')}
                    errors={fieldErrors}
                    control={control}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormSelect name="location" label={t('dialog.location')} options={locations} control={control} required={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    name='city'
                    label={t('dialog.city')}
                    errors={fieldErrors}
                    control={control}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    name='postCode'
                    label={t('dialog.postCode')}
                    errors={fieldErrors}
                    control={control}
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    name='lat'
                    label={t('dialog.lat')}
                    errors={fieldErrors}
                    control={control}
                    required={true}
                  />
                </Grid>
                <Grid  item xs={12} sm={6}>
                  <FormTextField
                    name='lng'
                    label={t('dialog.lng')}
                    errors={fieldErrors}
                    control={control}
                    required={true}
                  />
                </Grid>
              </Grid>
              <Divider orientation="vertical" variant="middle" flexItem className="hidden lg:inline-flex" />
              <Grid container item md={6} spacing={2}>
                <Grid item xs={12}>
                  <p className="text-xl font-medium">{ t('dialog.contacts') }</p>
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    name='web'
                    label={t('dialog.web')}
                    errors={fieldErrors}
                    control={control}
                    required={false}
                  />
                </Grid>
                <Grid  item xs={12}>
                  <FormTextField
                    name='phone'
                    label={t('dialog.phone')}
                    errors={fieldErrors}
                    control={control}
                    required={false}
                  />
                </Grid>
                <Grid  item xs={12}>
                  <FormTextField
                    name='email'
                    label={t('dialog.email')}
                    errors={fieldErrors}
                    control={control}
                    required={false}
                  />
                </Grid>
                <Grid  item xs={12}>
                  <FormTextField
                    name='description'
                    label={t('dialog.description')}
                    errors={fieldErrors}
                    control={control}
                    required={false}
                  />
                </Grid>
                <Divider />
                <Grid container className="flex flex-column" gap={1}>
                  {
                    !isEditTime ? (
                      <Grid item xs={12} className="p-4 pb-0">
                        <Button size="small" className="ml-2 mt-2 pt-2" startIcon={<Edit />} onClick={() => setIsEditTime(true)}>{ t('dialog.addOpenedTime') }</Button>
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid item xs={12} className="pl-4 pt-4">
                          <p className="text-xl font-medium">{ t('dialog.openedTime') }</p>
                        </Grid>
                        <Grid item xs={12} className=''>
                          <Typography variant="body2">{ t('')}</Typography>
                        </Grid>
                      </Grid>
                    )
                  }
                  { isEditTime && <OpenedTimeCard openingHours={openingHours} update={handleOpeningHoursUpdate} />}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="px-6">
            <Button variant='outlined' onClick={handleCloseDialog}>{ t('dialog.cancel') }</Button>
            <LoadingButton type="submit" variant="contained" disabled={!isValid} loading={isLoading}>{ t('dialog.submit') }</LoadingButton>
          </DialogActions>
        </StyledForm>
      </FormProvider>
      <DevTool control={control} />
    </Dialog>
  );
}

export default EditCafeForm;
