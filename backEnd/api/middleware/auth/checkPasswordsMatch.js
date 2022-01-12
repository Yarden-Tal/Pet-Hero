"use strict";
exports.__esModule = true;
var checkPasswordsMatch = function (req, res, next) {
    var _a = req.body, password = _a.password, passwordVerify = _a.passwordVerify;
    if (password !== passwordVerify)
        return res.status(400).send({ error: "Passwords do not match" });
    next();
};
exports["default"] = checkPasswordsMatch;
