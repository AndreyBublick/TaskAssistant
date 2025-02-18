import axios from "axios";

export const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY,
  },
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  ...settings,
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("sn-token")}`;

  return config;
});
