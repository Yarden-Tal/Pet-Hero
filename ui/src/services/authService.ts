import axios from "axios";
import { IAuthService } from "../interfaces/serviceInterfaces";

const BACK_URL_PORT: number = 8000;
const BASE_BACK_URL: string = `http://localhost:${BACK_URL_PORT}`;
const AUTH_URL: string = "/auth";
axios.defaults.headers.common["Authorization"] = "token";

const authService: IAuthService = (() => {
  const TOKEN_STORAGE_KEY = "token";
  const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

  axios.interceptors.request.use((config) => {
    const token = `Bearer ${getToken()}`;
    //@ts-ignore
    if (config?.headers && token) config.headers.Authorization = token;
    return config;
  });

  return {
    login: async (email, password) => {
      const loginResponse = await axios.post(
        `${BASE_BACK_URL}${AUTH_URL}/login`,
        {
          email,
          password,
        }
      );
      return loginResponse.data;
    },
    signup: async (params) => {
      const signupResponse = await axios.post(
        `${BASE_BACK_URL}${AUTH_URL}/signup`,
        params
      );

      return {};
    },
  };
})();

export default authService;
