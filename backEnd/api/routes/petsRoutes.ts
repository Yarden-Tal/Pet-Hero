const router = require("express").Router();
// Middleware
import verifyToken from "../middleware/auth/verifyToken";
import verifyAdmin from "../middleware/auth/verifyAdmin";
import isPetAvailable from "../middleware/isPetAvailable";
import isPetAdoptedOrFostered from "../middleware/isPetAdoptedOrFostered";
import isPetSaved from "../middleware/isPetSaved";
const upload = require("../middleware/pictureUpload");
// Validation
import validateBody from "../middleware/auth/validateBody";
import adoptionSchemaAjv from "../validation/adoptionSchemaAJV";
import addPetSchemaAjv from "../validation/addPetSchemaAJV";

import {
  addPet,
  getPetById,
  editPet,
  getPetsByUserId,
  getPets,
  adoptOrFosterPet,
  returnPet,
  savePet,
  unsavePet,
  deletePet,
} from "../controllers/petsControllers";
// Admin only routes
router
  .post("/", upload, validateBody(addPetSchemaAjv), verifyAdmin, addPet)
  .put("/:id", upload, validateBody(addPetSchemaAjv), verifyAdmin, editPet)
  .delete("/:id/delete", verifyAdmin, deletePet);
// Logged in user routes
router
  .get("/user/:userId", verifyToken, getPetsByUserId)
  .get("/:id", verifyToken, getPetById)
  .get("/", verifyToken, getPets) //SEARCH!!
  .post(
    "/:id/adopt",
    verifyToken,
    validateBody(adoptionSchemaAjv), //RECHECK VALIDATION
    isPetAvailable,
    adoptOrFosterPet //Check why saved several times on Mongo!!
  )
  .post("/:id/return", verifyToken, isPetAdoptedOrFostered, returnPet)
  .post("/:id/save", verifyToken, isPetSaved, savePet)
  .delete("/:id/unsave", verifyToken, unsavePet);

export default router;
