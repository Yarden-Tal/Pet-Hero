import { NextFunction, Response } from "express";
import { IRequestWithEmail } from "../../../models/interfaces";
const User = require("../../../database/schemas/userSchema");

const isNewUser = async (
  req: IRequestWithEmail,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    next();
  } catch (error) {
    console.error(error);
  }
};

export default isNewUser;
