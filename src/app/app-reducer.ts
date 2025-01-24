import {ThemeModeType} from "../common/theme/Theme";


const CHANGE_THEME_MODE = 'CHANGE_THEME_MODE';

const initialState = {

themeMode:'light' as ThemeModeType,

};





export const appReducer = (state: AppStateType = initialState, action: ActionType): AppStateType => {
    switch (action.type) {


        case CHANGE_THEME_MODE:{
        const {themeMode} = action.payload;

            return {...state,themeMode};

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


