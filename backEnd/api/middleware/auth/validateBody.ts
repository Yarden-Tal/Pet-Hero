import Ajv, { Schema } from "ajv";
import { Request, Response, NextFunction } from "express";
import addFormats from "ajv-formats";
const ajv = new Ajv();
addFormats(ajv);

const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      // @ts-ignore
      res.status(400).send(ajv.errors[0]["message"]);
      return;
    }
    next();
  };
};

export default validateBody;
