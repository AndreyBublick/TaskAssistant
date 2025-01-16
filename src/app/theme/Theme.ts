import {createTheme} from "@mui/material";

export type ThemeModeType = 'light'| 'dark';

export const getTheme = (themeMode:ThemeModeType)=>{


   return  createTheme({
        palette: {
            primary: {
                main: '#458965', // Основной цвет для primary
            },
            mode: themeMode,
        },
    });

};

