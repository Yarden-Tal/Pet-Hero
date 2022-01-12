"use strict";
exports.__esModule = true;
var router = require("express").Router();
var authControllers_1 = require("../controllers/authControllers");
var checkPasswordsMatch_1 = require("../middleware/auth/checkPasswordsMatch");
var isNewUser_1 = require("../middleware/auth/isNewUser");
var validateBody_1 = require("../middleware/auth/validateBody");
var loginSchemaAJV_1 = require("../validation/loginSchemaAJV");
var signupSchemaAJV_1 = require("../validation/signupSchemaAJV");
router
    .post("/signup", validateBody_1["default"](signupSchemaAJV_1["default"]), isNewUser_1["default"], checkPasswordsMatch_1["default"], authControllers_1.signup)
    .post("/login", validateBody_1["default"](loginSchemaAJV_1["default"]), authControllers_1.login);
exports["default"] = router;
