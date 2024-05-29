import Joi from "joi";

const BlogValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(null, ""),
  category: Joi.string().required(),
  slug: Joi.string().allow(null, ""),
});

export { BlogValidationSchema };
