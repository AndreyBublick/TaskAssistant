import { useAppDispatch, useAppSelector } from "common/hooks";
import type { FC } from "react";
import { getAppError, getAppIsInitialized, getModeTheme } from "app/app-reducer";
import { getTheme } from "common/theme";
import { useEffect } from "react";
import { fetchAuthMe } from "../features/login/model/auth-reducer/auth-reducer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AlertStatus, Header } from "common/components";
import { Route, Routes } from "react-router";
import { routes } from "common/routes";

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
