// Types
import { Response, NextFunction } from "express";
import UserType from "../../models/UserType";
// Interfaces
import { IRequestWithEmail } from "../../models/interfaces";
// Schemas
const User = require("../../database/schemas/userSchema");

const isEmailInUse = async (
  req: IRequestWithEmail,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email }: { email: string } = req.body;
    const usersCollection = await User.find({});
    usersCollection.forEach((existingUser: UserType) => {
      if (email === existingUser.email) return res.status(400);
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

export default isEmailInUse;
