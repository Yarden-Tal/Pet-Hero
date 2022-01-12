"use strict";
exports.__esModule = true;
require("dotenv").config();
var jwt = require("jsonwebtoken");
var verifyAdmin = function (req, res, next) {
    try {
        if (req.method === "OPTIONS")
            return next();
        var authHeader = req.headers["authorization"];
        var token = authHeader && authHeader.split(" ")[1];
        if (token == null)
            return res.sendStatus(401);
        jwt.verify(token, process.env.TOKEN_SECRET || "", function (err, user) {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            if (!req.user.user.isAdmin)
                return res.sendStatus(403);
            else
                next();
        });
    }
    catch (err) {
        console.error(err);
    }
};
exports["default"] = verifyAdmin;
