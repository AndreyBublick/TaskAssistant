import { todolistsReducer } from '../features/todolists/model/todolistSlice/todolistsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import { tasksReducer } from '../features/todolists/model/tasksSlice/tasksSlice';
import { baseApi } from 'app/baseApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const rootReducer = {
  app: appReducer,
  todolists: todolistsReducer,
  tasks: tasksReducer,

  [baseApi.reducerPath]: baseApi.reducer,
};
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/*@ts-ignore*/
window.state = store.getState;
