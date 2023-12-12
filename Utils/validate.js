const Joi = require("joi");

const validateSchema = (schema) => {
  return (body) => {
    return schema.validate(body, { abortEarly: false });
  };
};

const weatherSchema = Joi.object({
  city: Joi.string().required().messages({
    "any.required": "City cannot be empty",
  }),
});


const latSchema = Joi.object({
  lat: Joi.string().required().messages({
    "any.required": "Lat cannot be empty",
  }),
  long:Joi.string().required().messages({
    "any.required": "Long cannot be empty",
  }),
});

const RegSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email address",
    }),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Your password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character. it should be at least 8 characters long",
    }),
  confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Confirm password must be the same as the password",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email address",
    }),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Your password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character. it should be at least 8 characters long",
    })
});

exports.weatherInfoSchema = validateSchema(weatherSchema);
exports.regInfoSchema= validateSchema(RegSchema);
exports.loginInfoSchema = validateSchema(loginSchema);
exports.latitudeSchema =validateSchema(latSchema )
