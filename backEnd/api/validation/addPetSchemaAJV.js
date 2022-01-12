"use strict";
exports.__esModule = true;
var addPetSchemaAjv = {
    type: "object",
    properties: {
        type: { type: "string", "enum": ["Dog", "Cat"] },
        name: { type: "string" },
        adoptionStatus: {
            type: "string",
            "enum": ["Available", "Adopted", "Fostered"]
        },
        height: { type: "string" },
        weight: { type: "string" },
        color: { type: "string" },
        bio: { type: "string" },
        hypoallergenic: { type: "string", "enum": ["false", "true"] },
        dietaryRestrictions: { type: "string" },
        breed: { type: "string" }
    },
    required: [
        "type",
        "name",
        "adoptionStatus",
        "height",
        "weight",
        "color",
        "bio",
        "hypoallergenic",
        "dietaryRestrictions",
        "breed",
    ],
    additionalProperties: false
};
exports["default"] = addPetSchemaAjv;
