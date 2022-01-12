// Enums
import { adoptionStatusEnum, petTypesEnum } from "../enums";
// Types
import PetType from "../types/petType";
import { AxiosResponse } from "axios";
// Interfaces
import { ISearchParams } from "./componentInterfaces";
import { ILogin } from "./contextInterfaces";

// Auth service interfaces:

export interface ISignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordVerify: string;
  phone: number;
}

export interface IAuthService {
  login: (email: string, password: string) => Promise<ILogin>;
  signup: (params: ISignUpParams) => Promise<any>;
}

// Pets service interfaces:

export interface IPetsService {
  addPet: (data: IAddPetParams) => Promise<PetType>;
  getPets: (params?: ISearchParams) => Promise<PetType[]>;
  getPetById: (id: string) => Promise<PetType>;
  editPet: (params: any) => Promise<PetType>;
  savePet: (id: string) => Promise<void>;
  unsavePet: (id: string) => Promise<void>;
  adoptOrFosterPet: (id: string, adoptionType: string) => Promise<void>;
  returnPet: (id: string) => Promise<void>;
}

export interface IAddPetParams {
  type: string;
  name: string;
  adoptionStatus: string;
  picture: string;
  height: number;
  weight: number;
  color: string;
  breed: string;
  bio: string;
  hypoallergenic: boolean;
}

export interface IEditPetParams extends IAddPetParams {
  _id: string;
}

export type IGetPetsParams = {
  search?: boolean;
  adoptionStatus: adoptionStatusEnum;
  height: [number, number];
  name: string;
  type: petTypesEnum;
  weight: [number, number];
};

export interface IUsersService {
  getPets: (id: string) => Promise<PetType[]>;
  updateUser: (
    params: IUpdateUserParams,
    id: string
  ) => Promise<AxiosResponse<any, any>>;
}

export interface IUpdateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
}
