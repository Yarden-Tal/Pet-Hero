"use strict";
exports.__esModule = true;
var router = require("express").Router();
var isEmailInUse_1 = require("../middleware/isEmailInUse");
var verifyToken_1 = require("../middleware/auth/verifyToken");
var verifyAdmin_1 = require("../middleware/auth/verifyAdmin");
var usersControllers_1 = require("../controllers/usersControllers");
router
    .get("/:id", verifyToken_1["default"], usersControllers_1.getUserById)
    .put("/:id", verifyToken_1["default"], isEmailInUse_1["default"], usersControllers_1.updateUser) //VALIDATE!!
    .get("/", verifyAdmin_1["default"], usersControllers_1.getUsers)
    .get("/:id/full", verifyToken_1["default"], usersControllers_1.getUserByIdFull);
exports["default"] = router;
