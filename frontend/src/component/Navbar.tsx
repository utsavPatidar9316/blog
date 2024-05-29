import { useSearchContext } from "../context/SearchText";

const Navbar = () => {
  const { searchTxt, setSearchTxt } = useSearchContext();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Article
        </a>
        <div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
