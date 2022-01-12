require("dotenv").config();
const jwt = require("jsonwebtoken");
import { Response, NextFunction } from "express";
import { ITokenRequest } from "../../../models/interfaces";
import UserType from "../../../models/UserType";

const verifyAdmin = (req: ITokenRequest, res: Response, next: NextFunction) => {
  try {
    if (req.method === "OPTIONS") return next();
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "",
      (err: any, user: { user: UserType }) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        if (!req.user.user.isAdmin) return res.sendStatus(403);
        else next();
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export default verifyAdmin;
