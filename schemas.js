const Joi = require("joi");

module.exports.playerSchema = Joi.object({
  player: Joi.object({
    name: Joi.string().required(),
    age: Joi.number(),
    gender: Joi.string(),
  }).required(),
});
