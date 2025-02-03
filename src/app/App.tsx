import React, { FC, useEffect } from "react";
import "../App.css";
import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { Main } from "./Main";
import { Header } from "common/components/header/Header";
import { useAppSelector } from "common/hooks/Hooks";
import { getTheme } from "common/theme/Theme";
import { fetchTodoListsTC } from "../features/todolists/model/todolist-reducer/todolists-reducer";
import { getModeTheme } from "./app-reducer";

export const App: FC = () => {
  const themeMode = useAppSelector(getModeTheme);

  const theme = getTheme(themeMode);

  useEffect(() => {
    fetchTodoListsTC();
  }, []);

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
