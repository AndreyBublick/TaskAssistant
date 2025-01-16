import React, {FC, useEffect} from 'react';
import './App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Header} from "./Header";
import {Main} from "./Main";
import {getTheme} from "./theme/Theme";
import {useSelector} from "react-redux";
import {getModeTheme} from "./app-selectors";
import {useAppDispatch, useAppSelector} from "../hooks/Hooks";
import {changeThemeModeAC} from "./app-reducer";


export type FilterValuesType = "all" | "active" | "completed" | 'three';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string,
    filter: FilterValuesType,
    title: string,
};


export const App: FC = () => {

    const themeMode = useAppSelector(getModeTheme);
    const theme = getTheme(themeMode);



    return <ThemeProvider theme={theme}>
        <div className="App">
            <CssBaseline/>
            <Header/>
            <Main/>

        </div>
    </ThemeProvider>
}


