import axios, { AxiosResponse } from 'axios';

const baseURL = import.meta.env.VITE_APP_API_URL;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.baseURL = baseURL;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const httpPost = async <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  const response = await axios.post(`${baseURL}${url}`, data);
  return response;
};

export const httpGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const response = await axios.get(`${baseURL}${url}`);
  return response;
};

export const httpDelete = async (url: string): Promise<void> => {
  await axios.delete(`${baseURL}${url}`);
};