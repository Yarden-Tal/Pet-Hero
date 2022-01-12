"use strict";
exports.__esModule = true;
var loginSchemaAjv = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", format: "password", minLength: 5 }
    },
    required: ["email", "password"],
    additionalProperties: false
};
exports["default"] = loginSchemaAjv;
