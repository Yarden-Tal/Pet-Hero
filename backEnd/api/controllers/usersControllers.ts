const bcrypt = require("bcrypt");
// Types
import { Request, Response } from "express";
import UserType from "../../models/UserType";
// Interfaces
import { ITokenRequest } from "../../models/interfaces";
// Schemas
const User = require("../../database/schemas/userSchema");

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ error: "User not found!" });
    const user: UserType = await User.findOne({ _id: id });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (req: ITokenRequest, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password }: UserType = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const idToUpdate: string = req.params.id;
    const user = await User.findOne({ idToUpdate });
    if (!user) return res.status(400).send({ error: "User not found!" });
    console.log(idToUpdate);
    const updatedUser = await User.findByIdAndUpdate(idToUpdate, {
      firstName,
      lastName,
      email,
      phone,
      hashedPassword,
    });
    return res.status(202).json(updatedUser);
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: UserType[] = await User.find({});
    res.json({ users: users });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

export const getUserByIdFull = async (
  //For presenting info on the app
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user: UserType = await User.findOne({ _id: id });
    const {
      firstName,
      lastName,
      email,
      phone,
      savedPets,
      adoptedPets,
      fosteredPets,
    } = user;
    return res.status(200).json({
      firstName,
      lastName,
      email,
      phone,
      savedPets,
      adoptedPets,
      fosteredPets,
    });
  } catch (err) {
    console.error(err);
  }
};
