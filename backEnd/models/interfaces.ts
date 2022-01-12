// Types
import { Request } from "express";
import UserType from "./UserType";
// Enums
import { adoptionStatusEnum, adoptionTypeEnum } from "./enums";

export interface ITokenRequest extends Request {
  user: { user: UserType };
  file: { filename: string };
}

export interface IRequestWithEmail extends Request {
  email: string;
}

export interface ILoginParams {
  email: string;
  password: string;
  passwordVerify: string;
}

export interface IMimetypeMap {
  "image/png": string;
  "image/jpeg": string;
  "image/jpg": string;
}

export interface IAdoptionType {
  adoptionType: adoptionTypeEnum;
}

export interface ISearchParams {
  type?: string;
  name?: string;
  adoptionStatus?: adoptionStatusEnum;
  height?: string[];
  weight?: string[];
}
