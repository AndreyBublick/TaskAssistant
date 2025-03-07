import { changeIsAuth, selectAppError, selectModeTheme } from 'app/appSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AlertStatus, Header } from 'common/components';
import { Route, Routes } from 'react-router';
import { getTheme } from 'common/theme';
import { routes } from 'common/routes';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useMeQuery } from '../features/login/api/authApi';
import { ResultCodeStatus } from 'common/enums';

export const App: FC = () => {
  const themeMode = useAppSelector(selectModeTheme);
  const error = useAppSelector(selectAppError);
  const theme = getTheme(themeMode);
  const isOpen = error !== null;

  const { data, isLoading } = useMeQuery();

  const [isInitialized, setIsInitialized] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (data?.resultCode === ResultCodeStatus.success) {
        dispatch(changeIsAuth({ isAuth: true }));
      }
      setIsInitialized(true);
    }
  }, [dispatch, data, isLoading]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />

        {isOpen && <AlertStatus />}
        {isInitialized && (
          <Routes>
            {routes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        )}

        {/*  {isAuth ? <Main /> : <Navigate to={"/login"} />}*/}
      </div>
    </ThemeProvider>
  );
};
