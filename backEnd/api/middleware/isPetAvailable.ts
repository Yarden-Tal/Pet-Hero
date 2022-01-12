// Types
import { Response, NextFunction } from "express";
import PetType from "../../models/PetType";
// Interfaces
import { ITokenRequest } from "../../models/interfaces";
// Schemas
const Pet = require("../../database/schemas/petSchema");

const isPetAvailable = async (
  req: ITokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const adoptedPetId = req.params.id;
    if (!adoptedPetId) return res.status(400).send("Pet ID not found");
    const selectedPet: PetType = await Pet.findById(adoptedPetId);
    console.log(selectedPet);
    if (selectedPet.adoptionStatus !== "Available")
      return res.status(400).send("Pet already fostered or adopted");
    next();
  } catch (err) {
    console.error(err);
  }
};

export default isPetAvailable;
