import Joi from "joi";

const stringNotEmpty = Joi.string();

export const string = Joi.string().allow("").trim();
export const number = Joi.number();
export const boolean = Joi.boolean();
export const dateIso = Joi.date().iso();
export const array = (item) => Joi.array().items(item);
export const object = <T = any>(keys: Joi.PartialSchemaMap<T>) =>
  Joi.object<T>().keys(keys);

export const objectIdString = stringNotEmpty.hex().length(24);

export const pageNumber = number.integer().min(1).default(1);

export const limitItemNumber = number.integer().min(1).max(50).default(10);

export const unixTimestampNumber = number.integer().min(0);

export const Coordinate = object({
  latitude: number.min(-90).max(90).required(),
  longitude: number.min(-180).max(180).required(),
});

export const Dimension = object({
  height: number.greater(0).required(),
  width: number.greater(0).required(),
  depth: number.greater(0).required(),
  weight: number.greater(0).required(),
});

export const Item = object({
  name: stringNotEmpty.required(),
  description: string.default(""),
  quantity: number.min(1).required(),
  price: number.min(0).required(),
  dimension: Dimension.required(),
});

export const phoneString = string.regex(/^\d+$/).max(15);
