require("dotenv").config();
import { Response, NextFunction } from "express";
import { ITokenRequest } from "../../../models/interfaces";
const jwt = require("jsonwebtoken");
import UserType from "../../../models/UserType";

const verifyToken = (req: ITokenRequest, res: Response, next: NextFunction) => {
  try {
    if (req.method === "OPTIONS") return next();
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "",
      (err: any, user?: object) => {
        if (err) return res.sendStatus(403);
        // @ts-ignore
        req.user = user as UserType;
        next();
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export default verifyToken;
