const signupSchemaAjv = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password", minLength: 5 },
    passwordVerify: { type: "string", format: "password", minLength: 5 },
    phone: { type: "number", minLength: 10 },
    savedPets: { type: "array" },
    adoptedPets: { type: "array" },
    fosteredPets: { type: "array" },
  },
  required: ["firstName", "lastName", "email", "password", "phone"],
  additionalProperties: false,
};

export default signupSchemaAjv;
