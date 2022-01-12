"use strict";
exports.__esModule = true;
var ajv_1 = require("ajv");
var ajv_formats_1 = require("ajv-formats");
var ajv = new ajv_1["default"]();
ajv_formats_1["default"](ajv);
var validateBody = function (schema) {
    return function (req, res, next) {
        var valid = ajv.validate(schema, req.body);
        if (!valid) {
            // @ts-ignore
            res.status(400).send(ajv.errors[0]["message"]);
            return;
        }
        next();
    };
};
exports["default"] = validateBody;
