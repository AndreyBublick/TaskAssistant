import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router';
import type { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { changeIsAuth, selectCaptcha, selectIsAuth, setCaptcha } from 'app/appSlice';
import { useLoginMutation } from '../../api/authApi';
import { ResultCodeStatus } from 'common/enums';
import { useLazyGetCaptchaUrlQuery } from 'app/securityApi';

type Props = {};
type HookForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
export const Login: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const captcha = useAppSelector(selectCaptcha);
  const [login] = useLoginMutation();
  const [getCaptcha] = useLazyGetCaptchaUrlQuery();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<HookForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
      captcha: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<HookForm> = async values => {
    try {
      const response = await login(values);

      const data = response?.data;

      if (data?.resultCode === ResultCodeStatus.success) {
        const token = data?.data.token;

        if (token) {
          localStorage.setItem('sn-token', token);
          dispatch(changeIsAuth({ isAuth: true }));
          dispatch(setCaptcha({ captcha: null }));
        }
      } else if (data?.resultCode === ResultCodeStatus.captcha) {
        const resCaptcha = await getCaptcha();
        const url = resCaptcha?.data?.url;
        if (url) {
          dispatch(setCaptcha({ captcha: url }));
        }
      }
    } finally {
      reset();
    }
  };

  const fieldEmail = watch('email');
  const fieldPassword = watch('password');
  const fieldCaptcha = watch('captcha');

  const isActivate =
    Object.keys(errors).length > 0 || !fieldEmail || !fieldPassword || (captcha ? !fieldCaptcha : false);

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

              <TextFieldStyled
                {...register('email', {
                  required: 'Email is required',
                  validate: value => {
                    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailValid.test(value) ? true : 'Invalid email address';
                  },
                })}
                size={'small'}
                label={'Email'}
                type={'email'}
                variant={'outlined'}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

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
                label={'Password'}
                variant={'outlined'}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

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
              {captcha && (
                <>
                  <img src={captcha} alt={'captcha'} style={{ height: '60px', width: '160px' }} />
                  <TextField
                    {...register('captcha', {
                      required: 'captcha is required',
                    })}
                    size={'small'}
                    sx={{ marginBottom: 2 }}>
                    {captcha}
                  </TextField>
                </>
              )}
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
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  padding: '50px',

  justifyContent: 'center',
}));
const TextFieldStyled = styled(TextField)(() => ({
  margin: '10px 0',
}));
