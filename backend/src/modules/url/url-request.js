import Joi from "joi";

export const createShortUrlDTO = Joi.object({
  originalUrl: Joi.string().uri().required(),
});
