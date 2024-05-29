import express from "express";
import controller from "../../controller/blog.controller";
import { BLOG_ROUTE } from "../../utils/route.enums";
import schemaValidation from "../../middleware/schemaValidation.middleware";
import { BlogValidationSchema } from "../../schemaValidation/blog";
const blogRoute = express.Router();

blogRoute.post(
  BLOG_ROUTE.create,
  schemaValidation(BlogValidationSchema),
  controller.create
);

blogRoute.post(BLOG_ROUTE.list, controller.list);

blogRoute.get(BLOG_ROUTE.getOne, controller.get);

blogRoute.put(BLOG_ROUTE.updateOne, controller.update);

blogRoute.delete(BLOG_ROUTE.delete, controller.remove);

export default blogRoute;
