// Types
import { Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
// Interfaces
import { ITokenRequest } from "../../models/interfaces";
// Schemas
const Pet = require("../../database/schemas/petSchema");
const User = require("../../database/schemas/userSchema");

const isPetSaved = async (
  req: ITokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const savedPetId: string = req.params.id.toString();
    const userId = req.user.user._id;
    const user: HydratedDocument<any> = await User.findById(userId);
    if (user.savedPets.includes(savedPetId))
      return res.status(400).send({ message: "Pet already saved" });
    next();
  } catch (err) {
    console.error(err);
  }
};

export default isPetSaved;
