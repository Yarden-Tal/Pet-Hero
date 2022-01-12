import { Request, Response, NextFunction } from "express";

const checkPasswordsMatch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, passwordVerify } = req.body;
  if (password !== passwordVerify)
    return res.status(400).send({ error: "Passwords do not match" });
  next();
};

export default checkPasswordsMatch;
