"use strict";
exports.__esModule = true;
var router = require("express").Router();
// Middleware
var verifyToken_1 = require("../middleware/auth/verifyToken");
var verifyAdmin_1 = require("../middleware/auth/verifyAdmin");
var isPetAvailable_1 = require("../middleware/isPetAvailable");
var isPetAdoptedOrFostered_1 = require("../middleware/isPetAdoptedOrFostered");
var isPetSaved_1 = require("../middleware/isPetSaved");
var upload = require("../middleware/pictureUpload");
// Validation
var validateBody_1 = require("../middleware/auth/validateBody");
var adoptionSchemaAJV_1 = require("../validation/adoptionSchemaAJV");
var addPetSchemaAJV_1 = require("../validation/addPetSchemaAJV");
var petsControllers_1 = require("../controllers/petsControllers");
// Admin only routes
router
    .post("/", upload, validateBody_1["default"](addPetSchemaAJV_1["default"]), verifyAdmin_1["default"], petsControllers_1.addPet)
    .put("/:id", upload, validateBody_1["default"](addPetSchemaAJV_1["default"]), verifyAdmin_1["default"], petsControllers_1.editPet)["delete"]("/:id/delete", verifyAdmin_1["default"], petsControllers_1.deletePet);
// Logged in user routes
router
    .get("/user/:userId", verifyToken_1["default"], petsControllers_1.getPetsByUserId)
    .get("/:id", verifyToken_1["default"], petsControllers_1.getPetById)
    .get("/", verifyToken_1["default"], petsControllers_1.getPets) //SEARCH!!
    .post("/:id/adopt", verifyToken_1["default"], validateBody_1["default"](adoptionSchemaAJV_1["default"]), //RECHECK VALIDATION
isPetAvailable_1["default"], petsControllers_1.adoptOrFosterPet //Check why saved several times on Mongo!!
)
    .post("/:id/return", verifyToken_1["default"], isPetAdoptedOrFostered_1["default"], petsControllers_1.returnPet)
    .post("/:id/save", verifyToken_1["default"], isPetSaved_1["default"], petsControllers_1.savePet)["delete"]("/:id/unsave", verifyToken_1["default"], petsControllers_1.unsavePet);
exports["default"] = router;
