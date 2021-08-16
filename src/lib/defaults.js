import dotenv from 'dotenv';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const baseURL = process.env.SERVER_BASE_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.authorization = `Bearer ${accessToken}`;
axios.defaults.withCredentials = true;
