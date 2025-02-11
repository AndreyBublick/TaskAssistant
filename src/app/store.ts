import { todolistsSlice } from "../features/todolists/model/todolist-reducer/todolists-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-reducer";
import { tasksSlice } from "../features/todolists/model/tasks-reducer/tasks-reducer";
import { authSlice } from "../features/login/model/auth-slice/authSlice";

const rootReducer = {
  app: appSlice.reducer,
  todolists: todolistsSlice.reducer,
  tasks: tasksSlice.reducer,
  auth: authSlice.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
