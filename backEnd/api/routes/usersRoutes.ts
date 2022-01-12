const router = require("express").Router();
import isEmailInUse from "../middleware/isEmailInUse";
import verifyToken from "../middleware/auth/verifyToken";
import verifyAdmin from "../middleware/auth/verifyAdmin";
import {
  getUserById,
  updateUser,
  getUsers,
  getUserByIdFull,
} from "../controllers/usersControllers";

router
  .get("/:id", verifyToken, getUserById)
  .put("/:id", verifyToken, isEmailInUse, updateUser) //VALIDATE!!
  .get("/", verifyAdmin, getUsers)
  .get("/:id/full", verifyToken, getUserByIdFull);

export default router;
