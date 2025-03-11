import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import { baseApi } from 'app/baseApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const rootReducer = {
  app: appReducer,
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
