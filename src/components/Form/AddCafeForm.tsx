import React, { useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Button, Dialog, Divider, DialogContent, DialogTitle, Grid, DialogActions, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab/';

import { RootState } from '../../store';
import { FormValues, CafeDetailResponse } from '../../types/cafe';

import { styled } from '@mui/material/styles';
import FormTextField from './FormComponets/FormTextField';
import FormSelect from './FormComponets/FormSelect';
import FormTimeField from './FormComponets/FormTimeField';

type FormNewCafeType ={
  openDialog: boolean;
  onClose: () => void;
  onFormData: (data: CafeDetailResponse) => void;
  isLoading: boolean;
};

const StyledForm = styled('form')`
  padding: 24px 32px;
  max-width: 900px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  margin-bottom: 20px;
  text-align: start;
  font-size: 24px;
`;

const StyledDialogActions = styled(DialogActions)`
  padding: 16px 24px;
`;

const AddCafeForm: React.FC<FormNewCafeType> = ({ openDialog, onClose, onFormData, isLoading }) => {
  const [isEditTime, setIsEditTime] = useState(false);
  const { t } = useTranslation();

  const locations = useSelector((state: RootState) => state.locations.locations);

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

  const methods = useForm<FormValues>({
    defaultValues: {
      location: '',
      name: '',
      web: '',
      phone: '',
      mondayOpen: '',
      mondayClose: '',
      street: '',
      city: '',
      postCode: '',
      lat: '',
      lng: '',
      description: '',
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

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const apiData: CafeDetailResponse = {
      name: data.name,
      address: {
        street: data.street,
        city: data.city,
        post_code: data.postCode,
        location: data.location,
      },
      location: [
        data.location
      ],
      contact: {
        web: data.web,
        phone: data.phone,
      },
      opening_hours: [
        {
          day_of_week: 'monday',
          open_time: data.mondayOpen,
          close_time: data.mondayClose
        }
      ],
      coordinates: {
        lat: parseInt(data.lat),
        lng: parseInt(data.lng),
      },
      description: data.description,
    }
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

  return (
    <Dialog open={openDialog} maxWidth="xl" onClose={handleCloseDialog}>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <StyledDialogTitle>{ t('dialog.newCafe') }</StyledDialogTitle>
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
                      <Grid item xs={12} className="pl-4 pt-4">
                        <p className="text-xl font-medium">{ t('dialog.openedTime') }</p>
                      </Grid>
                    )
                  }
                  {
                    isEditTime && days.map((day) => {
                      return (
                        <Grid  item xs={12} className="flex justify-center">
                          <Grid container className="flex pl-4" gap={1}>
                            <Grid item xs={12} sm={2} className='flex justify-start items-center'>
                              <Typography variant="body2">{ day.label}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormTimeField label={t('dialog.from')} name={t(`${day.openValue}`)} control={control} required={false} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormTimeField label={t('dialog.to')} name={t(`${day.closeValue}`)} control={control} required={false} />
                            </Grid>
                            <Divider flexItem className="sm:hidden" />
                          </Grid>
                        </Grid >
                      )
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <StyledDialogActions>
            <Button variant='outlined' onClick={handleCloseDialog}>{ t('dialog.cancel') }</Button>
            <LoadingButton type="submit" variant="contained" disabled={!isValid} loading={isLoading}>{ t('dialog.submit') }</LoadingButton>
          </StyledDialogActions>
        </StyledForm>
      </FormProvider>
      <DevTool control={control} />
    </Dialog>
  );
}

export default AddCafeForm;
