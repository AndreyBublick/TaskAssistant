import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "../../api/authApi";
import { authApi } from "../../api/authApi";
import { changeAppInitialized, changeAppStatus, setAppError } from "app/app-reducer";
import { AppStatus, ResultCodeStatus } from "common/enums/enums";
import { clearTodolists } from "../../../todolists/model/todolist-reducer/todolists-reducer";
import { clearTasks } from "../../../todolists/model/tasks-reducer/tasks-reducer";

const initialState = {
  isAuth: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    getIsAuth: (state) => state.isAuth,
  },
  reducers: {
    changeIsAuth: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = action.payload.isAuth;
      }
    }); /*.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = action.payload.isAuth;
      }
    });*/

    /*.addCase(logout.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuth = action.payload.isAuth;
        }
      });*/
  },
});
export const { getIsAuth } = authSlice.selectors;
export const { changeIsAuth } = authSlice.actions;
export const login = createAsyncThunk("auth/login", async (payload: LoginPayload, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await authApi.login(payload);
    /*const userId = response.data.data.userId;*/

    if (response.data.resultCode === ResultCodeStatus.success) {
      /*  return { isAuth: true };*/
      thunkAPI.dispatch(changeIsAuth({ isAuth: true }));
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
      /*return { isAuth: false };*/
      thunkAPI.dispatch(changeIsAuth({ isAuth: false }));
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await authApi.logout();

    if (response.data.resultCode === ResultCodeStatus.success) {
      thunkAPI.dispatch(changeIsAuth({ isAuth: false }));
      thunkAPI.dispatch(clearTodolists());
      thunkAPI.dispatch(clearTasks());
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  } finally {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.loading }));
    const response = await authApi.me();

    if (response.data.resultCode === ResultCodeStatus.success) {
      return { isAuth: true };
    } else if (response.data.resultCode === ResultCodeStatus.fail) {
      thunkAPI.dispatch(setAppError({ error: response.data.messages[0] }));
      return { isAuth: false };
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  } finally {
    thunkAPI.dispatch(changeAppInitialized({ isInitialized: true }));
    thunkAPI.dispatch(changeAppStatus({ status: AppStatus.succeeded }));
  }
});
