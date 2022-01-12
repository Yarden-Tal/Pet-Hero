// Libraries
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
// Types and interfaces
import PetType from "../../models/PetType";
import {
  IAdoptionType,
  ISearchParams,
  ITokenRequest,
} from "../../models/interfaces";
// Schemas
const Pet = require("../../database/schemas/petSchema");
const User = require("../../database/schemas/userSchema");
// Helpers
import handleSearch, { imageHandler } from "./helpers/petsHelper";

export const addPet = async (req: ITokenRequest, res: Response) => {
  try {
    //Handle photo upload
    const {
      type,
      name,
      adoptionStatus,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    }: PetType = req.body;
    let picture = req.file.filename;

    const newPet: PetType = {
      type,
      name,
      adoptionStatus,
      picture,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    };
    const petModel = new Pet(newPet);
    await await petModel.save();
    res.status(201).json(petModel);
  } catch (err: any) {
    return res.status(400).json(err.message);
  }
};

export const getPetById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const _id: string = req.params.id;
    if (!_id) throw new Error("Pet not found");
    const pet: PetType = await Pet.findById(_id);
    return res.status(200).json(pet);
  } catch (err: any) {
    return res.status(400).json(err.message);
  }
};

export const getPetsByUserId = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { userId }: any = req.params;
    if (!userId) return res.status(400).send({ error: "User not found!" });
    const user = await User.findOne({ id: userId });
    console.log(user);

    return res.status(200).json(user.savedPets);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

export const editPet = async (req: ITokenRequest, res: Response) => {
  try {
    const {
      _id,
      type,
      name,
      adoptionStatus,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    }: PetType = req.body;

    const idToUpdate: string = req.params.id;

    const editedPet: PetType = {
      _id: idToUpdate,
      type,
      name,
      adoptionStatus,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    };

    if (req.file) editedPet.picture = req.file.filename;
    const updatedPet: PetType = await Pet.findByIdAndUpdate(
      idToUpdate,
      editedPet
    );
    return res.status(202).send(updatedPet);
  } catch (err) {
    console.error(err);
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const { type, name, adoptionStatus, height, weight }: ISearchParams =
      req.query;
    const { search } = req.query;
    if (!search) {
      const pets: PetType[] = await Pet.find({});
      imageHandler(pets);
      res.status(200).json(pets);
      return;
    }
    const pets: PetType[] = await handleSearch({
      type,
      name,
      adoptionStatus,
      height,
      weight,
    });
    imageHandler(pets);
    res.status(200).json(pets);
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

export const adoptOrFosterPet = async (req: ITokenRequest, res: Response) => {
  try {
    const adoptedPetId: string = req.params.id;
    const selectedPet: HydratedDocument<any> = await Pet.findById(adoptedPetId);
    const { adoptionType }: IAdoptionType = req.body;
    if (!adoptionType) return res.status(400).send("Adoption info not found");
    const userId = req.user.user._id;
    const user: HydratedDocument<any> = await User.findById(userId);
    if (user.adoptedPets == null) user.adoptedPets = [];
    if (adoptionType === "Adopted") user.adoptedPets.push(adoptedPetId);
    else user.fosteredPets.push(adoptedPetId);
    selectedPet.adoptionStatus = adoptionType;
    await user.save();
    await selectedPet.save();
    return res.status(200).json(user.fosteredPets);
  } catch (err) {
    console.error(err);
  }
};

export const returnPet = async (req: ITokenRequest, res: Response) => {
  try {
    const adoptedPetId: string = req.params.id.toString();
    const selectedPet: HydratedDocument<any> = await Pet.findById(adoptedPetId);
    const userId = req.user.user._id;
    selectedPet.adoptionStatus = "Available";
    const user: HydratedDocument<any> = await User.findById(userId);
    await user.save();
    await selectedPet.save();
    return res.status(200).send({ message: "Pet returned" });
  } catch (err) {
    console.error(err);
  }
};

export const savePet = async (req: ITokenRequest, res: Response) => {
  try {
    const savedPetId: string = req.params.id;
    const userId = req.user.user._id;
    const user: HydratedDocument<any> = await User.findById(userId);
    if (user.savedPets == null) user.savedPets = [];
    user.savedPets.push(savedPetId);
    await user.save();
    return res.status(200).send({ message: "Pet saved" });
  } catch (err) {
    console.error(err);
  }
};

export const unsavePet = async (req: ITokenRequest, res: Response) => {
  try {
    const petId: string = req.params.id;
    const userId = req.user.user._id;
    const user: HydratedDocument<any> = await User.findById(userId);
    if (!user.savedPets.includes(petId))
      return res.status(400).send({ message: "Pet not on list" });
    user.savedPets.splice(petId, 1);
    await user.save();
    return res.status(200).send({ message: "Pet unsaved" });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};

export const deletePet = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Pet not found");
    await Pet.deleteOne({ _id: id });
    res.status(204).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json(err.message);
  }
};
