// Libraries
import axios from "axios";
// Interfaces
import { IAddPetParams, IPetsService } from "../interfaces/serviceInterfaces";
// Types
import PetType from "../types/petType";

const BACK_URL_PORT: number = 8000;
const BASE_BACK_URL: string = `http://localhost:${BACK_URL_PORT}`;
const PETS_URL: string = "/pets";

const petsService: IPetsService = (() => {
  return {
    addPet: async (data: IAddPetParams) => {
      const newPetResponse = await axios.post(
        `${BASE_BACK_URL}${PETS_URL}`,
        data
      );
      return newPetResponse.data as PetType;
    },
    // TYPE PARAMS? & ADV-SEARCH COMPONENT
    getPets: async (params) => {
      const petsList = await axios.get(`${BASE_BACK_URL}${PETS_URL}`, {
        params,
      });
      return petsList.data as PetType[];
    },
    getPetById: async (id: string) => {
      const pet = await axios.get(`${BASE_BACK_URL}${PETS_URL}/${id}`);
      return pet.data as PetType;
    },
    editPet: async ({ _id, petData }) => {
      var object = {};
      Object.keys(petData).forEach(function (key) {
        //@ts-ignore
        object[key] = petData.get(key);
      });
      const pet = await axios.put(
        `${BASE_BACK_URL}${PETS_URL}/${_id}`,
        petData
      );
      return pet.data as PetType;
    },
    savePet: async (_id: string) => {
      await axios.post(`${BASE_BACK_URL}${PETS_URL}/${_id}/save`);
    },
    unsavePet: async (_id: string) => {
      await axios.delete(`${BASE_BACK_URL}${PETS_URL}/${_id}/unsave`);
    },
    adoptOrFosterPet: async (_id: string, adoptionType: any) => {
      const adoptionTypeObj = {
        adoptionType,
      };
      await axios.post(
        `${BASE_BACK_URL}${PETS_URL}/${_id}/adopt`,
        adoptionTypeObj
      );
    },
    returnPet: async (_id: string) => {
      await axios.post(`${BASE_BACK_URL}${PETS_URL}/${_id}/return`);
    },
  };
})();

export default petsService;
