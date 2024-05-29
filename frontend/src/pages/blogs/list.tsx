import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogList } from "../../features/blogSlice";
import { AppDispatch, RootState } from "../../store";
import { HandleControls } from "../../types/common";
import { defaultControls, useDebounce } from "../../utils/constants";
import { useSearchContext } from "../../context/SearchText";
import { useNavigate } from "react-router-dom";
import { blogType } from "../../types/blog";
import { deleteBlog } from "./lib/blog";
import { toast } from "react-toastify";

// Define the List component
const List: React.FC = () => {
  // State variables
  const [handleControls, setHandleControls] =
    useState<HandleControls>(defaultControls);
  const { searchTxt } = useSearchContext();
  const dispatch: AppDispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const { loading, error, data } = useSelector(
    (state: RootState) => state.blog
  );
  const debouncedSearchTxt = useDebounce(searchTxt, 500);
  const navigate = useNavigate();

  // Fetch blogs on initial load and when handleControls change
  useEffect(() => {
    dispatch(blogList(handleControls));
  }, [handleControls, dispatch]);

  // Update handleControls when searchTxt changes
  useEffect(() => {
    setHandleControls((prevControls) => ({
      ...prevControls,
      search: searchTxt,
    }));
  }, [debouncedSearchTxt]);

  // Toggle dropdown menu
  const toggleDropdown = (id: string) => {
    setDropdownOpen((prevId) => (prevId === id ? null : id));
  };

  // Handle blog edit
  const handleEdit = (blog: blogType) => {
    navigate("/edit", { state: blog });
  };

  // Handle blog deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      dispatch(blogList(handleControls));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Error deleting blog!");
    }
  };

  // Render component
  return (
    <div className="container mt-5">
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      {error && <div>Error: {error}</div>}
      <div className="d-flex justify-content-end mb-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("form")}
        >
          Add+
        </button>
        {data && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() =>
              setHandleControls((prevControls) => ({
                ...prevControls,
                sortOrder: prevControls.sortOrder === "asc" ? "desc" : "asc",
              }))
            }
          >
            Sort by CreatedAt {handleControls.sortOrder === "asc" ? "▲" : "▼"}
          </button>
        )}
      </div>
      <div className="row">
        {data ? (
          data.map((blog) => (
            <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={blog._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {blog.category}
                  </h6>
                  <p className="card-text">{blog.description}</p>
                  <a
                    href={blog.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {blog.slug}
                  </a>
                  <div className="dropdown position-absolute top-0 end-0 m-2">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id={`dropdownMenuButton-${blog._id}`}
                      aria-expanded={dropdownOpen === blog._id}
                      onClick={() => toggleDropdown(blog._id)}
                    >
                      ⋮
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        dropdownOpen === blog._id ? "show" : ""
                      }`}
                      aria-labelledby={`dropdownMenuButton-${blog._id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(blog)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Record Not Found</div>
        )}
      </div>
    </div>
  );
};

export default List;
