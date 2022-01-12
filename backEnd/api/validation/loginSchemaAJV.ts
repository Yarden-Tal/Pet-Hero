const loginSchemaAjv = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password", minLength: 5 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export default loginSchemaAjv;
