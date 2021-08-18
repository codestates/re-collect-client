import axios from 'axios';
import dotenv from 'dotenv';

const baseURL = 'https://api.recollect.today';

const _axios = axios.create({
  baseURL: process.env.SERVER_BASE_URL || baseURL,
  headers: {
    withCredentials: true,
  },
});

_axios.interceptors.request.use((request) => {
  request.headers.authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
  return request;
});

export default _axios;
