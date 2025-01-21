import {TaskType} from "./App";
import {getTheme, ThemeModeType} from "../common/theme/Theme";
import {createTheme} from "@mui/material";


const CHANGE_THEME_MODE = 'CHANGE_THEME_MODE';

const initialState = {

themeMode:'light' as ThemeModeType,

};





export const appReducer = (state: AppStateType = initialState, action: ActionType): AppStateType => {
    switch (action.type) {


        case CHANGE_THEME_MODE:{
        const {themeMode} = action.payload;
          /*  const stateCopy = {...state};*/
            /*stateCopy.theme = {...state.theme,palette:{...state.theme.palette,mode:'dark'}};*/
            return {...state,themeMode};
            ///todo
        }

        default: {
            return state;
        }
    }
};


export const changeThemeModeAC = (payload:{themeMode:ThemeModeType}) => ({
    type: CHANGE_THEME_MODE,
    payload
} as const);


 export type AppStateType = typeof initialState;

type ChangeThemeModeACType = ReturnType<typeof changeThemeModeAC>;

type ActionType = ChangeThemeModeACType;


export type TaskItemType = {
    [key: string]: TaskType[];
};