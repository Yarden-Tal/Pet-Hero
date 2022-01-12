// Enums
import { adoptionStatusEnum } from "../enums";

type PetType = {
  _id: string;
  type: string;
  name: string;
  adoptionStatus: adoptionStatusEnum;
  picture: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergenic: boolean;
  dietaryRestrictions: string;
  breed: string;
};

export default PetType;
