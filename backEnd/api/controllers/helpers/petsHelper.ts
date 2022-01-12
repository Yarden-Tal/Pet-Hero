import { ISearchParams } from "../../../models/interfaces";
import PetType from "../../../models/PetType";
const Pet = require("../../../database/schemas/petSchema");

const handleSearch = async (params: ISearchParams): Promise<PetType[]> => {
  const query: any = {};
  //@ts-ignore
  if (params.height) {
    const heightFrom = params.height[0];
    const heightTo = params.height[1];
    query.height = { $gt: heightFrom, $lt: heightTo };
  }
  //@ts-ignore
  if (params.weight) {
    const weightFrom = params.weight[0];
    const weightTo = params.weight[1];
    query.weight = { $gt: weightFrom, $lt: weightTo };
  }
  if (params.type) query.type = params.type;
  if (params.adoptionStatus) query.adoptionStatus = params.adoptionStatus;
  if (params.name) query.name = params.name;
  console.log("LAST", query);

  const pets: PetType[] = await Pet.find(query);
  console.log(`PETS FOUND: `, pets);

  return pets;
};

export const imageHandler = (petsArr: PetType[]) => {
  const URL = "http://localhost:8000/images/";
  petsArr.forEach((p) => {
    p.picture = `${URL + p.picture}`;
  });
};

export default handleSearch;
