import React from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

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
          <StyledDialogTitle>Přidat novou kavárnu</StyledDialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid  item xs={12}>
                <FormTextField
                  name='name'
                  label='Název kavárny'
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect name="location" label="Lokalita" options={districts} control={control} required={true} />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='street'
                  label='Název ulice'
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='city'
                  label='Město'
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='postCode'
                  label='PSČ'
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormTextField
                  name='lat'
                  label='Lat'
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid  item xs={6}>
                <FormTextField
                  name='lng'
                  label='Lng'
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid  item xs={6}>
                <FormTextField
                  name='time'
                  label='Otevírací doba'
                  errors={fieldErrors}
                  control={control}
                  required={false}
                />
              </Grid>
              <Grid  item xs={6}>
                <FormTextField
                  name='web'
                  label='Webová stránka'
                  errors={fieldErrors}
                  control={control}
                  required={false}
                />
              </Grid>
              <Grid  item xs={12}>
                <FormTextField
                  name='description'
                  label='Popis'
                  errors={fieldErrors}
                  control={control}
                  required={false}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <StyledDialogActions>
            <Button variant='outlined' onClick={handleCloseDialog}>Cancel</Button>
            <LoadingButton type="submit" variant="contained" disabled={!isValid} loading={isLoading}>Odeslat</LoadingButton>
          </StyledDialogActions>
        </StyledForm>
      </FormProvider>
      <DevTool control={control} />
    </Dialog>
  );
}

export default AddCafeForm;
