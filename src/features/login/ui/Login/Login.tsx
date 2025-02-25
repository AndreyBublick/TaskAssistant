import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import { getIsAuth, login } from '../../model/authSlice/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {};
type HookForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export const Login: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  /*const { errors, getFieldProps, handleSubmit, values } = useFormik({
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
    onSubmit: async (values /!*formikHelpers*!/) => {
      await dispatch(login(values));
    },
  });*/

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    control,
  } = useForm<HookForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onChange',
  });
  const onSubmit = (values: HookForm) => dispatch(login(values));

  const isActivate = Object.keys(formState.errors).length > 0;
  return (
    <>
      {isAuth ? (
        <Navigate to={'/'} />
      ) : (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BoxStyled>
              <TypographyStyled fontWeight={700} variant={'h5'}>
                Sign in
              </TypographyStyled>

              <TypographyStyled variant={'body1'}>Welcome, please sign in to continue</TypographyStyled>
              {/*  {errors.email && <div>Email is required</div>}*/}
              {/*{...getFieldProps('email')}*/}
              <TextFieldStyled
                {...register('email', {
                  required: 'Email is required',
                  validate: value => {
                    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailValid.test(value) ? true : 'Invalid email address';
                  },
                })}
                size={'small'}
                /* name={'email'}*/
                label={'Email'}
                type={'email'}
                variant={'outlined'}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* {...getFieldProps('password')}*/}
              <TextFieldStyled
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 3,
                    message: 'Password must be at least 3 characters long',
                  },
                })}
                size={'small'}
                type={'password'}
                /* name={'password'}*/
                label={'Password'}
                variant={'outlined'}
                required={true}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              {/*  {errors.password && }*/}
              <FormControlLabel
                sx={{ marginBottom: '10px' }}
                control={
                  <Controller
                    name={'rememberMe'}
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                    )}
                  />
                }
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
