import React, { FC, useEffect } from "react";
import "../App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Header } from "common/components/header/Header";
import { useAppDispatch, useAppSelector } from "common/hooks/Hooks";
import { getTheme } from "common/theme/Theme";

import { getAppError, getAppIsInitialized, getModeTheme } from "./app-reducer";
import { AlertStatus } from "common/components/alertStatus/AlertStatus";
import { Route, Routes } from "react-router";
import { routes } from "common/routes/routes";
import { fetchAuthMe } from "../features/login/model/auth-reducer/authReducer";

export const App: FC = () => {
  const themeMode = useAppSelector(getModeTheme);
  const error = useAppSelector(getAppError);
  const theme = getTheme(themeMode);
  const isOpen = error !== null;

  const initialized = useAppSelector(getAppIsInitialized);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />

        {isOpen && <AlertStatus />}
        {initialized && (
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        )}

        {/*  {isAuth ? <Main /> : <Navigate to={"/login"} />}*/}
      </div>
    </ThemeProvider>
  );
};
