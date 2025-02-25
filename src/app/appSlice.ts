import { createSlice } from '@reduxjs/toolkit';
import { AppStatus } from 'common/enums';

const initialState = {
  themeMode: 'light' as ThemeModeType,
  error: null as null | string,
  status: 'idle' as AppStatus,
  isInitialized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  selectors: {
    getModeTheme: state => state.themeMode,
    getAppStatus: state => state.status,
    getAppIsInitialized: state => state.isInitialized,
    getAppError: state => state.error,
  },
  reducers: create => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    changeAppStatus: create.reducer<{ status: AppStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    changeAppInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  /*extraReducers: (builder) => {},*/
});

export const appReducer = appSlice.reducer;
export const { getModeTheme, getAppStatus, getAppError, getAppIsInitialized } = appSlice.selectors;
export const { changeThemeMode, changeAppStatus, setAppError, changeAppInitialized } = appSlice.actions;

export type ThemeModeType = 'light' | 'dark';
