const mongoose = require("mongoose");
import validator from "validator";

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, required: true },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error(`${value} is not a valid email address`);
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    trim: true,
    validate(value: String) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  passwordVerify: {
    type: String,
    required: true,
    minLength: 5,
    trim: true,
    validate(value: String) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    minLength: 10,
  },
  savedPets: [{ type: mongoose.Types.ObjectId, ref: "Pet" }],
  adoptedPets: [{ type: mongoose.Types.ObjectId, ref: "Pet" }],
  fosteredPets: [{ type: mongoose.Types.ObjectId, ref: "Pet" }],
});

module.exports = mongoose.model("User", userSchema);
