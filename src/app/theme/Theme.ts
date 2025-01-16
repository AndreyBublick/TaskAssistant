import {createTheme} from "@mui/material";

export type ThemeModeType = 'light'| 'dark';

export const getTheme = (themeMode:ThemeModeType)=>{


   return  createTheme({
        palette: {
            mode: themeMode,
        },
    });

};

