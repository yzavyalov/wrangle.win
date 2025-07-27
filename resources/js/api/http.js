import axios from "axios";
import { AUTH } from "./enpoints";

const http = axios.create({
  withCredentials: true,
});

let csrfChecked = false;

http.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!document.cookie.includes('XSRF-TOKEN=') && !csrfChecked) {
    await axios.get(AUTH.CSRF_TOKEN, { withCredentials: true });
    csrfChecked = document.cookie.includes('XSRF-TOKEN='); // підтвердження
  }

  return config;
});

export { http };
