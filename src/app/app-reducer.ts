import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStatus } from "common/enums/enums";

const initialState = {
  themeMode: "light" as ThemeModeType,
  error: null as null | string,
  status: "idle" as AppStatus,
  isInitialized: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  selectors: {
    getModeTheme: (state) => state.themeMode,
    getAppStatus: (state) => state.status,
    getAppIsInitialized: (state) => state.isInitialized,
    getAppError: (state) => state.error,
  },
  reducers: {
    changeThemeMode: (state, action: PayloadAction<{ themeMode: ThemeModeType }>) => {
      state.themeMode = action.payload.themeMode;
    },
    changeAppStatus: (state, action: PayloadAction<{ status: AppStatus }>) => {
      state.status = action.payload.status;
    },
    changeAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  /*extraReducers: (builder) => {},*/
});

export const appReducer = appSlice.reducer;
export const { getModeTheme, getAppStatus, getAppError, getAppIsInitialized } = appSlice.selectors;
export const { changeThemeMode, changeAppStatus, setAppError, changeAppInitialized } = appSlice.actions;

export type ThemeModeType = "light" | "dark";
