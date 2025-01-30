import { RootStateType } from "./store";

export const getModeTheme = (state: RootStateType) => state.app.themeMode;
