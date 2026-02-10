import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/Admin/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
