require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Types
import { Request, Response } from "express";
import UserType from "../../models/UserType";
// Interfaces
import { ILoginParams } from "../../models/interfaces";
// Schemas
const User = require("../../database/schemas/userSchema");

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone }: UserType = req.body;
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: UserType = {
      isAdmin: false,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      passwordVerify: hashedPassword,
      phone,
      savedPets: [],
      adoptedPets: [],
      fosteredPets: [],
    };
    const userModel = new User(newUser);
    await userModel.save();
    return res.status(201).json(userModel);
  } catch (err: any) {
    return res.status(400).json(err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: ILoginParams = req.body;
    const user = await User.findOne(
      { email: email },
      { passwordVerify: 0, _v: 0 }
    );
    if (user === null) return res.status(400).send("Cannot find user");
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).send("Make sure all details are correct");
    else {
      const acessToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: "3h",
      });
      return res.status(200).json({
        accessToken: acessToken,
        user: { ...user._doc, password: "" },
      });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

// export const forgotPwd = (req: IRequestWithEmail, res: Response) => {
//   try {
//     const { email }: { email: string } = req.body;
//     User.findOne({ email }, (err: Error, user: any) => {
//       if (err || !user)
//         return res.status(400).send({ error: "Email address not found!" });
//       const token = jwt.sign({ user }, process.env.RESET_PWD_KEY, {expiresIn: "10m"})
//       const
//     });
//   } catch (error) {}
// };
