const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addFormat('email', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
ajv.addFormat('password', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
ajv.addFormat('floatString', /^[\d.]*$/);
ajv.addFormat('integerString', /^[\d]*$/);

const updateUserInfoSchema = {
    type: "object",
    properties: {
      firstName: { type: "string", minLength: 2},
      lastName: {type: "string", minLength: 2},
      email: { type: "string", format: "email" },
      phoneNumber: {type: "string", pattern: "^[0-9]+$" },
      bio: {type: "string", minLength: 2},
      password: { type: "string", format: "password" },
      repassword: { type: "string", format: "password" },
      admin: { type: "string", enum: ["0", "1"] },
    },
    required: [],
    additionalProperties: true,
  };

const logInSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string"},
    },
    required: ["email", "password"],
    additionalProperties: true,
  };

  const createUserSchema = {
    type: "object",
    properties: {
      firstName: { type: "string", minLength: 2},
      lastName: {type: "string", minLength: 2},
      email: { type: "string", format: "email" },
      phoneNumber: {type: "string", pattern: "^[0-9]+$" },
      password: { type: "string", format: "password" },
      repassword: { type: "string", format: "password" },
      admin: { type: "string", enum: ["0", "1"] },
    },
    required: ["firstName", "email", "password"],
    additionalProperties: true,
  };

  const addPetSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 2},
        type: {type: "string", minLength: 2},
        hypoallergenic: { type: "string", enum: ["0", "1"] },
        height: {type: "string", format: "floatString" },
        weight: {type: "string", format: "floatString" },
        color: {type: "string"},
        bio: {type: "string"},
        breed: {type: "string", minLength: 2},
        userIdFeaturing: {type: "string", format: "integerString" },
        adoptionStatus: {type: "string", minLength: 2},
    },
    required: ["name", "type", "userIdFeaturing", "adoptionStatus"],
    additionalProperties: true,
  };


function validateBody(schema) {
    return (req, res, next) => {
      const valid = ajv.validate(schema, req.body);
      if (!valid) {
        res.status(400).send(ajv.errors);
        return;
      }
      console.log('Body valid')
      next();
    };
  }

  
  module.exports = { validateBody, logInSchema, updateUserInfoSchema, createUserSchema, addPetSchema };
  
  