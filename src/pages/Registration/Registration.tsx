import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FormTextField from '../../components/common/FormComponets/FormTextField';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { httpPost } from '../../Utils/axiosService';

type FormValues = {
  username: string;
  password: string;
};

const Registration: FC = () => {
  const { t } = useTranslation();
  const { control, formState: { errors }, handleSubmit, reset } = useForm<FormValues>();

  const fieldErrors = {
    username: errors.username,
    password: errors.password,
  }

  const onSubmit = (values: FormValues) => {
    console.log(values);
    createNewUser(values);
    reset();
  }

  const createNewUser = async (data: FormValues) => {
    try {
      await httpPost('/api/user/registration', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card  sx={{ maxWidth: 800 }} className="mb-6 px-8 py-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Typography variant="h1" className="text-2xl mb-6">
              { t('registration.createAccount') }
            </Typography>
            <Grid container spacing={2}>
              <Grid  item xs={12}>
                <FormTextField
                  name='username'
                  label={t('loginUser.username')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
              <Grid  item xs={12}>
                <FormTextField
                  name='password'
                  label={t('loginUser.password')}
                  errors={fieldErrors}
                  control={control}
                  required={true}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className="p-4 justify-end">
            <Button type="submit" variant="contained">{ t('registration.submit')}</Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
};

export default Registration;
