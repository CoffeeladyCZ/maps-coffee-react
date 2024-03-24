import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormTextField from '../../components/common/FormComponets/FormTextField';
import { Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@mui/material';
import { httpPost } from '../../Utils/axiosService';
import { UserLogin } from '../../constants';
import { setLogin } from '../../store/settings';
import { FieldErrors } from '../../types/cafe';

type FormValues = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const { t } = useTranslation();
  const { control, formState: { errors }, handleSubmit, reset } = useForm<FormValues>();
  const history = useHistory();
  const dispatch = useDispatch();

  const fieldErrors = {
    username: errors.username,
    password: errors.password,
  }

  const onSubmit = (values: FormValues) => {
    createNewUser(values);
    reset();
  }

  const createNewUser = async (data: FormValues) => {
    try {
      await httpPost('/api/user/login', data);
      localStorage.setItem(UserLogin.LOGIN, 'true')
      dispatch(setLogin(true));
      history.push('/');
    } catch (error) {
      console.error(error.response.data.message);
      fieldErrors.username = error.response.data.message;
      console.log(fieldErrors)
    }
  };

  return (
    <>
      <Card  sx={{ maxWidth: 800 }} className="mb-6 px-8 py-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Typography variant="h1" className="text-2xl mb-6">
              { t('login') }
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
          <div>
            <Typography variant="body1">
              { t('loginUser.registrationInfo') }
              <Link
                underline="hover"
                className="pl-1 cursor-pointer"
                onClick={() => history.push('/registration')}
              >
                { t('loginUser.registrationAction')}
              </Link>
            </Typography>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
