import { setAppError } from "app/app-reducer";
import type { GetThunkAPI } from "@reduxjs/toolkit";

export const errorHandler = (data: { error: unknown; thunkAPI: GetThunkAPI<any> }) => {
  const errorMessage = data.error instanceof Error ? data.error.message : "Unknown error";
  data.thunkAPI.rejectWithValue(data.error);
  data.thunkAPI.dispatch(setAppError({ error: errorMessage }));
};
