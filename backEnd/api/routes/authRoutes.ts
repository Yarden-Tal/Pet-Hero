const router = require("express").Router();
import { signup, login } from "../controllers/authControllers";
import checkPasswordsMatch from "../middleware/auth/checkPasswordsMatch";
import isNewUser from "../middleware/auth/isNewUser";
import validateBody from "../middleware/auth/validateBody";
import loginSchemaAjv from "../validation/loginSchemaAJV";
import signupSchemaAjv from "../validation/signupSchemaAJV";

router
  .post(
    "/signup",
    validateBody(signupSchemaAjv),
    isNewUser,
    checkPasswordsMatch,
    signup
  )
  .post("/login", validateBody(loginSchemaAjv), login);

export default router;
