import { changeAppStatus, setAppError } from 'app/appSlice';
import type { GetThunkAPI } from '@reduxjs/toolkit';
import { AppStatus } from 'common/enums/enums';

import type { ResponseType } from 'common/types/types';
import type { AxiosResponse } from 'axios';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

export const handleServerNetworkError = (data: { error: unknown; thunkAPI: GetThunkAPI<any> }) => {
  const errorMessage = data.error instanceof Error ? data.error.message : 'netWork error';

  data.thunkAPI.rejectWithValue(data.error);
  data.thunkAPI.dispatch(setAppError({ error: errorMessage }));
  data.thunkAPI.dispatch(changeAppStatus({ status: AppStatus.failed }));
};

export const handleServerAppError = <T>(data: {
  response: AxiosResponse<ResponseType<T>>;
  thunkAPI: GetThunkAPI<any>;
}) => {
  const { thunkAPI, response } = data;

  const errorMessage = response.data.messages[0];

  thunkAPI.dispatch(setAppError(errorMessage ? { error: errorMessage } : { error: 'some Error' }));
};
export const dublicatesComponents = ({ quantity, item }: { quantity: number; item: ReactElement }): ReactElement[] => {
  return Array.from({ length: quantity }, (_, i) => cloneElement(item, { key: i }));
};
export const getLastItem = <T>(arr: T[]): T => {
  return arr[arr.length - 1];
};
