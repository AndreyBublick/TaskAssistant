import {createTheme} from "@mui/material";

export type ThemeModeType = 'light'| 'dark';

export const getTheme = (themeMode:ThemeModeType)=>{


   return  createTheme({
        palette: {
            primary: {
                main: '#458965',
                light:'#7AB898',
                dark:'#2D5A43',
            },
            secondary:{
                main:'#F5F5F5',
            },
            mode: themeMode,
        },
    });

};

