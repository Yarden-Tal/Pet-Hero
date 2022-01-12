import { Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { ITokenRequest } from "../../models/interfaces";
const Pet = require("../../database/schemas/petSchema");
const User = require("../../database/schemas/userSchema");

const isPetAdoptedOrFostered = async (
  req: ITokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const adoptedPetId: string = req.params.id.toString();
    const userId = req.user.user._id;
    const user: HydratedDocument<any> = await User.findById(userId);
    user.fosteredPets.forEach((p: any) => {
      if (p.toString() === adoptedPetId)
        user.fosteredPets.splice(adoptedPetId, 1);
      else
        return res.status(400).send({ message: "Pet not found on this user" });
    });
    user.adoptedPets.forEach((p: string) => {
      if (p.toString() === adoptedPetId)
        user.adoptedPets.splice(adoptedPetId, 1);
      else
        return res.status(400).send({ message: "Pet not found on this user" });
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

export default isPetAdoptedOrFostered;
