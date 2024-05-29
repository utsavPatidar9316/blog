import axiosInstance from "../../../axiosInstance";
import { blogForm } from "../../../types/blog";

export const addBlog = async (formData: blogForm) => {
  const res = await axiosInstance.post("blog/create", formData);
  return res.data.success;
};

export const editBlog = async (formData: blogForm, _id: string) => {
  const res = await axiosInstance.put(`blog/update/${_id}`, formData);
  return res.data.success;
};

export const deleteBlog = async (_id: string) => {
  const res = await axiosInstance.delete(`blog/delete/${_id}`);
  return res.data.success;
};
