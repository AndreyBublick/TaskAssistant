import { baseApi } from 'app/baseApi';

const securityApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCaptchaUrl: build.query<{ url: string }, void>({
      query: () => `/security/get-captcha-url`,
    }),
  }),
});

export const { useGetCaptchaUrlQuery, useLazyGetCaptchaUrlQuery } = securityApi;
