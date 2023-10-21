import React from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, DialogContent, DialogTitle, Grid, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab/';

import { cityLocations, FormValues } from '../../types';

import { styled } from '@mui/material/styles';
import FormTextField from './FormComponets/FormTextField';
import FormSelect from './FormComponets/FormSelect';

type FormNewCafeType ={
  openDialog: boolean;
  onClose: () => void;
  onFormData: (data: FormValues) => void;
  districts: cityLocations;
  isLoading: boolean;
};

const StyledForm = styled('form')`
  padding: 24px 32px;
`;

const StyledDialogTitle = styled(DialogTitle)`
  margin-bottom: 20px;
  text-align: start;
  font-size: 24px;
`;

const StyledDialogActions = styled(DialogActions)`
  padding: 16px 24px;
`;

const AddCafeForm: React.FC<FormNewCafeType> = ({ districts, openDialog, onClose, onFormData, isLoading }) => {
  const { t } = useTranslation();

  const methods = useForm<FormValues>({
    defaultValues: {
      location: [''],
      name: '',
      web: '',
      time: '',
      street: '',
      city: '',
      postCode: '',
      lat: 0,
      lng: 0,
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
    time: errors.time,
    web: errors.web,
    description: errors.description,
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (isValid) {
      onFormData(data);
      handleCloseDialog()
    }
  }

  const handleCloseDialog = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <FormProvider {...methods}>
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <StyledDialogTitle>{ t('dialog.newCafe') }</StyledDialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid  item xs={12}>
                <FormTextField
                  name='name'
                  label={t('dialog.nameCafe')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect name="location" label={t('dialog.location')} options={districts} control={control} required={true} />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='street'
                  label={t('dialog.street')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='city'
                  label={t('dialog.city')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='postCode'
                  label={t('dialog.postCode')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='lat'
                  label={t('dialog.lat')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid  item xs={6}>
                <FormTextField
                  name='lng'
                  label={t('dialog.lng')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid  item xs={6}>
                <FormTextField
                  name='time'
                  label={t('dialog.opened')}
                  errors={fieldErrors}
                  control={control}
                  required={false}
                />
              </Grid>
              <Grid  item xs={6}>
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
                  name='description'
                  label={t('dialog.description')}
                  errors={fieldErrors}
                  control={control}
                  required={false}
                />
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
