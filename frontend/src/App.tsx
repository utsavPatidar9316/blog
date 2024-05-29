import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Form from "./pages/blogs/form";
import List from "./pages/blogs/list";
import Edit from "./pages/blogs/edit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/form" element={<Form />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
