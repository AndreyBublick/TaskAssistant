import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStatus } from "common/enums/enums";

const initialState = {
  themeMode: "light" as ThemeModeType,
  error: null as null | string,
  status: "idle" as AppStatus,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  selectors: {
    getModeTheme: (state) => state.themeMode,
    getAppStatus: (state) => state.status,
    getAppError: (state) => state.error,
  },
  reducers: {
    changeThemeMode: (state, action: PayloadAction<{ themeMode: ThemeModeType }>) => {
      state.themeMode = action.payload.themeMode;
    },
    changeAppStatus: (state, action: PayloadAction<{ status: AppStatus }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {},
});

export const { getModeTheme, getAppStatus } = appSlice.selectors;
export const { changeThemeMode, changeAppStatus, setAppError } = appSlice.actions;

/*export const changeThemeModeAC = (payload: { themeMode: ThemeModeType }) =>
  ({
    type: CHANGE_THEME_MODE,
    payload,
  }) as const;*/

//TYPES

export type ThemeModeType = "light" | "dark";
