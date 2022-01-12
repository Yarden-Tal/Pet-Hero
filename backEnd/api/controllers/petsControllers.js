"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deletePet = exports.unsavePet = exports.savePet = exports.returnPet = exports.adoptOrFosterPet = exports.getPets = exports.editPet = exports.getPetsByUserId = exports.getPetById = exports.addPet = void 0;
// Schemas
var Pet = require("../../database/schemas/petSchema");
var User = require("../../database/schemas/userSchema");
// Helpers
var petsHelper_1 = require("./helpers/petsHelper");
exports.addPet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, name, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed, picture, newPet, petModel, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, type = _a.type, name = _a.name, adoptionStatus = _a.adoptionStatus, height = _a.height, weight = _a.weight, color = _a.color, bio = _a.bio, hypoallergenic = _a.hypoallergenic, dietaryRestrictions = _a.dietaryRestrictions, breed = _a.breed;
                picture = req.file.filename;
                newPet = {
                    type: type,
                    name: name,
                    adoptionStatus: adoptionStatus,
                    picture: picture,
                    height: height,
                    weight: weight,
                    color: color,
                    bio: bio,
                    hypoallergenic: hypoallergenic,
                    dietaryRestrictions: dietaryRestrictions,
                    breed: breed
                };
                petModel = new Pet(newPet);
                return [4 /*yield*/, petModel.save()];
            case 1: return [4 /*yield*/, _b.sent()];
            case 2:
                _b.sent();
                res.status(201).json(petModel);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_1.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPetById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, pet, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = req.params.id;
                if (!_id)
                    throw new Error("Pet not found");
                return [4 /*yield*/, Pet.findById(_id)];
            case 1:
                pet = _a.sent();
                return [2 /*return*/, res.status(200).json(pet)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_2.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPetsByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                if (!userId)
                    return [2 /*return*/, res.status(400).send({ error: "User not found!" })];
                return [4 /*yield*/, User.findOne({ id: userId })];
            case 1:
                user = _a.sent();
                console.log(user);
                return [2 /*return*/, res.status(200).json(user.savedPets)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json(err_3.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editPet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, type, name, adoptionStatus, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed, idToUpdate, editedPet, updatedPet, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, _id = _a._id, type = _a.type, name = _a.name, adoptionStatus = _a.adoptionStatus, height = _a.height, weight = _a.weight, color = _a.color, bio = _a.bio, hypoallergenic = _a.hypoallergenic, dietaryRestrictions = _a.dietaryRestrictions, breed = _a.breed;
                idToUpdate = req.params.id;
                editedPet = {
                    _id: idToUpdate,
                    type: type,
                    name: name,
                    adoptionStatus: adoptionStatus,
                    height: height,
                    weight: weight,
                    color: color,
                    bio: bio,
                    hypoallergenic: hypoallergenic,
                    dietaryRestrictions: dietaryRestrictions,
                    breed: breed
                };
                if (req.file)
                    editedPet.picture = req.file.filename;
                return [4 /*yield*/, Pet.findByIdAndUpdate(idToUpdate, editedPet)];
            case 1:
                updatedPet = _b.sent();
                return [2 /*return*/, res.status(202).send(updatedPet)];
            case 2:
                err_4 = _b.sent();
                console.error(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, name, adoptionStatus, height, weight, search, pets_1, pets, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.query, type = _a.type, name = _a.name, adoptionStatus = _a.adoptionStatus, height = _a.height, weight = _a.weight;
                search = req.query.search;
                if (!!search) return [3 /*break*/, 2];
                return [4 /*yield*/, Pet.find({})];
            case 1:
                pets_1 = _b.sent();
                petsHelper_1.imageHandler(pets_1);
                res.status(200).json(pets_1);
                return [2 /*return*/];
            case 2: return [4 /*yield*/, petsHelper_1["default"]({
                    type: type,
                    name: name,
                    adoptionStatus: adoptionStatus,
                    height: height,
                    weight: weight
                })];
            case 3:
                pets = _b.sent();
                petsHelper_1.imageHandler(pets);
                res.status(200).json(pets);
                return [3 /*break*/, 5];
            case 4:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(500).json(err_5.message)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.adoptOrFosterPet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var adoptedPetId, selectedPet, adoptionType, userId, user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                adoptedPetId = req.params.id;
                return [4 /*yield*/, Pet.findById(adoptedPetId)];
            case 1:
                selectedPet = _a.sent();
                adoptionType = req.body.adoptionType;
                if (!adoptionType)
                    return [2 /*return*/, res.status(400).send("Adoption info not found")];
                userId = req.user.user._id;
                return [4 /*yield*/, User.findById(userId)];
            case 2:
                user = _a.sent();
                if (user.adoptedPets == null)
                    user.adoptedPets = [];
                if (adoptionType === "Adopted")
                    user.adoptedPets.push(adoptedPetId);
                else
                    user.fosteredPets.push(adoptedPetId);
                selectedPet.adoptionStatus = adoptionType;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, selectedPet.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).json(user.fosteredPets)];
            case 5:
                err_6 = _a.sent();
                console.error(err_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.returnPet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var adoptedPetId, selectedPet, userId, user, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                adoptedPetId = req.params.id.toString();
                return [4 /*yield*/, Pet.findById(adoptedPetId)];
            case 1:
                selectedPet = _a.sent();
                userId = req.user.user._id;
                selectedPet.adoptionStatus = "Available";
                return [4 /*yield*/, User.findById(userId)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, selectedPet.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ message: "Pet returned" })];
            case 5:
                err_7 = _a.sent();
                console.error(err_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.savePet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var savedPetId, userId, user, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                savedPetId = req.params.id;
                userId = req.user.user._id;
                return [4 /*yield*/, User.findById(userId)];
            case 1:
                user = _a.sent();
                if (user.savedPets == null)
                    user.savedPets = [];
                user.savedPets.push(savedPetId);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ message: "Pet saved" })];
            case 3:
                err_8 = _a.sent();
                console.error(err_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.unsavePet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var petId, userId, user, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                petId = req.params.id;
                userId = req.user.user._id;
                return [4 /*yield*/, User.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user.savedPets.includes(petId))
                    return [2 /*return*/, res.status(400).send({ message: "Pet not on list" })];
                user.savedPets.splice(petId, 1);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ message: "Pet unsaved" })];
            case 3:
                err_9 = _a.sent();
                return [2 /*return*/, res.status(500).json(err_9.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id)
                    throw new Error("Pet not found");
                return [4 /*yield*/, Pet.deleteOne({ _id: id })];
            case 1:
                _a.sent();
                res.status(204).json({ ok: true });
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                return [2 /*return*/, res.status(500).json(err_10.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
