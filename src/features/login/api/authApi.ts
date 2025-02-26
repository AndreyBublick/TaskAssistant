import { instance } from 'common/instance';

import type { ResponseType } from 'common/types';
import { baseApi } from 'app/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<ResponseType<userData>, void>({ query: () => '/auth/me' }),
    login: build.mutation<ResponseType<{ userId: number; token: string }>, LoginPayload>({
      query: payload => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...payload },
      }),
    }),
    logout: build.mutation<ResponseType, void>({
      query: () => ({
        url: '/auth/login',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi;

export const _authApi = {
  me: () => instance.get<ResponseType<userData>>('/auth/me'),

  login: (payload: LoginPayload) =>
    instance.post<ResponseType<{ userId: number; token: string }>>('/auth/login', payload),

  logout: () => instance.delete<ResponseType>('/auth/login'),
};

////TYPES

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type userData = {
  id: number;
  email: string;
  login: string;
};
