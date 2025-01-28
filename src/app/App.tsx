import React, {FC} from 'react';
import '../App.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Header} from "../common/components/header/Header";
import {Main} from "./Main";
import {getTheme} from "../common/theme/Theme";
import {getModeTheme} from "./app-selectors";
import {useAppSelector} from "../common/hooks/Hooks";


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


