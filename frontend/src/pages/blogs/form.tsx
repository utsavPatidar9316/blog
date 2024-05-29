import { useFormik } from "formik";
import * as Yup from "yup";
import { addBlog } from "./lib/blog";
import { blogForm } from "../../types/blog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../context/SearchText";

// Define the Form component
const Form = () => {
  // Hooks
  const navigate = useNavigate();
  const { setSearchTxt } = useSearchContext();

  // Formik configuration
  const formik = useFormik<blogForm>({
    initialValues: {
      title: "",
      category: "",
      description: "",
      slug: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string(),
      slug: Yup.string().url("Invalid URL").optional(),
    }),
    onSubmit: async (values: blogForm, { resetForm }) => {
      try {
        await addBlog(values);
        toast.success("Blog added successfully!");
        resetForm();
        setSearchTxt("");
        navigate("/");
      } catch (error) {
        toast.error("Error adding blog!");
      }
    },
  });

  // Render component
  return (
    <div className="container d-flex justify-content-center mt-5">
      <form onSubmit={formik.handleSubmit} className="w-50">
        {/* Title */}
        <div className="form-group mt-2">
          <label>Title*</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Title"
            {...formik.getFieldProps("title")}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-danger">{formik.errors.title}</div>
          )}
        </div>
        {/* Category */}
        <div className="form-group mt-2">
          <label>Category*</label>
          <select
            id="category"
            className="form-control"
            {...formik.getFieldProps("category")}
          >
            <option value="">Choose Category</option>
            <option value="Food">Food</option>
            <option value="Education">Education</option>
            <option value="Businessmen">Businessmen</option>
            <option value="Positions">Positions</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-danger">{formik.errors.category}</div>
          )}
        </div>
        {/* Blog URL */}
        <div className="form-group mt-2">
          <label>Blog URL</label>
          <input
            type="text"
            className="form-control"
            id="slug"
            placeholder="Enter URL"
            {...formik.getFieldProps("slug")}
          />
          {formik.touched.slug && formik.errors.slug && (
            <div className="text-danger">{formik.errors.slug}</div>
          )}
        </div>
        {/* Description */}
        <div className="form-group mt-2">
          <label>Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter Description"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-danger">{formik.errors.description}</div>
          )}
        </div>
        {/* Buttons */}
        <div className="mt-2 d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
