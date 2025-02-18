import { instance } from "common/instance/instance";

import type { ResponseType } from "common/types/types";

export const authApi = {
  login: (payload: LoginPayload) => {
    return instance.post<ResponseType<{ userId: number; token: string }>>("/auth/login", payload);
  },
  me: () => instance.get<ResponseType<userData>>("/auth/me"),
  logout: () => instance.delete<ResponseType>("/auth/login"),
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
