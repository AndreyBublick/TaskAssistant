import React, { FC } from "react";
import "../App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Main } from "./Main";
import { getModeTheme } from "./app-selectors";
import { Header } from "common/components/header/Header";
import { useAppSelector } from "common/hooks/Hooks";
import { getTheme } from "common/theme/Theme";

export const App: FC = () => {
  const themeMode = useAppSelector(getModeTheme);

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
