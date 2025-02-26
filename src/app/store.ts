import { todolistsReducer } from '../features/todolists/model/todolistSlice/todolistsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import { tasksReducer } from '../features/todolists/model/tasksSlice/tasksSlice';
import { authReducer } from '../features/login/model/authSlice/authSlice';
import { todolistsApi } from '../features/todolists/api/todolistsApi';

const rootReducer = {
  app: appReducer,
  todolists: todolistsReducer,
  tasks: tasksReducer,
  auth: authReducer,
  [todolistsApi.reducerPath]: todolistsApi.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/*@ts-ignore*/
window.state = store.getState;
