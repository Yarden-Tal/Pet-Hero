// Enums
import { adoptionStatusEnum, petTypesEnum } from "../enums";
// Interfaces
import { ILabelType } from "../interfaces/componentInterfaces";

const labels: ILabelType[] = [
  {
    name: "Type: Cat",
    dbName: "type",
    value: petTypesEnum.CAT,
    color: "#7057ff",
    description: "",
  },
  {
    name: "Type: Dog",
    dbName: "type",
    value: petTypesEnum.DOG,
    color: "#008672",
    description: "",
  },
  {
    name: "Adoption Status: Available",
    dbName: "adoptionStatus",
    value: adoptionStatusEnum.AVAILABLE,
    color: "#b60205",
    description: "",
  },
  {
    name: "Adoption Status: Fostered",
    dbName: "adoptionStatus",
    value: adoptionStatusEnum.FOSTERED,
    color: "#d93f0b",
    description: "",
  },
  {
    name: "Adoption Status: Adopted",
    dbName: "adoptionStatus",
    value: adoptionStatusEnum.ADOPTED,
    color: "#0e8a16",
    description: "",
  },
];

export default labels;
