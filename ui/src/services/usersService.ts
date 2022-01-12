// Libraries
import axios from "axios";
// Interfaces
import {
  IUpdateUserParams,
  IUsersService,
} from "../interfaces/serviceInterfaces";

const BACK_URL_PORT: number = 8000;
const BASE_BACK_URL: string = `http://localhost:${BACK_URL_PORT}`;
const USERS_URL: string = "/users";

const usersService: IUsersService = (() => {
  return {
    // Get pets by user id
    getPets: async (params: any) => {
      const petsList = await axios.get(`${BASE_BACK_URL}${USERS_URL}`, {
        params,
      });
      return petsList.data;
    },
    updateUser: async (params: IUpdateUserParams, id: string) => {
      const updatedUser = await axios.put(
        `${BASE_BACK_URL}${USERS_URL}/${id}`,
        params
      );
      return updatedUser;
    },
  };
})();

export default usersService;
