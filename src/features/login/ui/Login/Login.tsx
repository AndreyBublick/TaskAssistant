import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import { getIsAuth, login } from '../../model/authSlice/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router';
import { useFormik } from 'formik';
import type { FC } from 'react';

type Props = {};
export const Login: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  const { errors, getFieldProps, handleSubmit, values } = useFormik({
    validate: values => {
      const errors: any = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 3) {
        errors.password = 'Password must be at least 3 characters long';
      }
      return errors;
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async (values /*formikHelpers*/) => {
      await dispatch(login(values));
      /*   console.log(response);

      formikHelpers.setErrors({
        email: 'Required',
        password: 'Required',
      });*/

      /* alert(JSON.stringify(values, null, 2));*/
    },
  });

  const isActivate = Object.keys(errors).length > 0;

  return (
    <>
      {isAuth ? (
        <Navigate to={'/'} />
      ) : (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit}>
            <BoxStyled>
              <TypographyStyled fontWeight={700} variant={'h5'}>
                Sign in
              </TypographyStyled>

              <TypographyStyled variant={'body1'}>Welcome, please sign in to continue</TypographyStyled>
              {/*  {errors.email && <div>Email is required</div>}*/}
              <TextFieldStyled
                {...getFieldProps('email')}
                size={'small'}
                name={'email'}
                label={'Email'}
                type={'email'}
                variant={'outlined'}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextFieldStyled
                {...getFieldProps('password')}
                size={'small'}
                type={'password'}
                label={'Password'}
                variant={'outlined'}
                required={true}
                error={!!errors.password}
                helperText={errors.password}
              />
              {/*  {errors.password && }*/}
              <FormControlLabel
                sx={{ marginBottom: '10px' }}
                control={<Checkbox {...getFieldProps('rememberMe')} checked={values.rememberMe} />}
                label="Remember me"
              />
              <Button
                size={'large'}
                variant={'contained'}
                type={'submit'}
                disabled={isActivate}
                sx={{ fontWeight: 700, textTransform: 'capitalize', fontSize: '16px' }}>
                sign in
              </Button>
            </BoxStyled>
          </form>
        </Container>
      )}
    </>
  );
};

const TypographyStyled = styled(Typography)(() => ({
  marginBottom: '10px',
  textAlign: 'center',
}));
const BoxStyled = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '5px',
  width: '400px',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  padding: '50px',
  /* alignItems: "center",*/
  justifyContent: 'center',
}));
const TextFieldStyled = styled(TextField)(() => ({
  margin: '10px 0',
}));
