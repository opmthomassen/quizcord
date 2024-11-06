const Joi = require("joi");

module.exports.userSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required(),
    age: Joi.number(),
    gender: Joi.string(),
  }).required(),
});
