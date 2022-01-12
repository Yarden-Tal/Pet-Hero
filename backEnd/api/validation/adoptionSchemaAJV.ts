const adoptionSchemaAjv = {
  type: "object",
  properties: {
    adoptionType: { type: "string", enum: ["Adopted", "Fostered"] },
  },
  required: ["adoptionType"],
  additionalProperties: false,
};

export default adoptionSchemaAjv;
