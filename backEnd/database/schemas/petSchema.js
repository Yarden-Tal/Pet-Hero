"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var petSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    adoptionStatus: { type: String, required: true },
    picture: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true, minLength: 2 },
    bio: { type: String, required: true, minLength: 20 },
    hypoallergenic: { type: Boolean, required: true },
    dietaryRestrictions: { type: String, required: true },
    breed: { type: String, required: true, minLength: 3 }
});
var Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
