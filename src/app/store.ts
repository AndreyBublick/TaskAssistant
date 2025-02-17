import { todolistsSlice } from "../features/todolists/model/todolist-reducer/todolists-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app-reducer";
import { tasksReducer } from "../features/todolists/model/tasks-reducer/tasks-reducer";
import { authReducer } from "../features/login/model/auth-reducer/authReducer";

const rootReducer = {
  app: appReducer,
  todolists: todolistsSlice.reducer,
  tasks: tasksReducer,
  auth: authReducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/*@ts-ignore*/
window.state = store.getState;
