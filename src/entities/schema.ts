import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  avatar: Joi.string(),
});

export const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  avatar: Joi.string(),
});
