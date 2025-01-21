import {createTheme} from "@mui/material";

export type ThemeModeType = 'light'| 'dark';

export const getTheme = (themeMode:ThemeModeType)=>{


   return createTheme({
        palette: {
            primary: {
                /*main: '#009688',
                light:'#33ab9f',
                dark:'#00695f',*/
                main: '#009688',


            },
            secondary:{
               /* main:'#00e5ff',
                dark:'#00a0b2',
                light:'#33eaff',*/
                main: '#f5f5f5',
            },
            mode: themeMode,

        },

    });

};

