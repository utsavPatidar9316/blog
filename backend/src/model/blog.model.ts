import mongoose, { Document, Schema, model } from "mongoose";
import { BlogType } from "./types/blog.types";

export type BlogModel = BlogType & Document;

const blogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Education", "Businessmen", "Positions"],
    },
    slug: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<BlogModel>("Blog", blogSchema);
