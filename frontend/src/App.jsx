import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/Admin/AddProduct";
import AdminLogin from "./Pages/Admin/AdminLogin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="admin/add-product" element={<AddProduct />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
