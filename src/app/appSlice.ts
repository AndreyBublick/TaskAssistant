import { createSlice } from '@reduxjs/toolkit';
import { AppStatus } from 'common/enums';

const initialState = {
  themeMode: 'light' as ThemeModeType,
  error: null as null | string,
  status: 'idle' as AppStatus,

  isAuth: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  selectors: {
    getModeTheme: state => state.themeMode,
    getAppStatus: state => state.status,
    getAppError: state => state.error,
    getIsAuth: state => state.isAuth,
  },
  reducers: create => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    changeAppStatus: create.reducer<{ status: AppStatus }>((state, action) => {
      state.status = action.payload.status;
    }),

    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
    changeIsAuth: create.reducer<{ isAuth: boolean }>((state, action) => {
      state.isAuth = action.payload.isAuth;
    }),
  }),
  /*extraReducers: (builder) => {},*/
});

export const appReducer = appSlice.reducer;
export const { getModeTheme, getAppError, getIsAuth } = appSlice.selectors;
export const { changeThemeMode, changeAppStatus, setAppError, changeIsAuth } = appSlice.actions;

export type ThemeModeType = 'light' | 'dark';
