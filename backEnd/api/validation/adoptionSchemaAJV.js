"use strict";
exports.__esModule = true;
var adoptionSchemaAjv = {
    type: "object",
    properties: {
        adoptionType: { type: "string", "enum": ["Adopted", "Fostered"] }
    },
    required: ["adoptionType"],
    additionalProperties: false
};
exports["default"] = adoptionSchemaAjv;
