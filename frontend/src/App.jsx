import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/Admin/AddProduct";
import AdminLogin from "./Pages/Admin/AdminLogin";
// User Pages
import UserLayout from "./Pages/User/UserLayout";
import HomePage from "./Pages/User/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Admin Acess Only */}
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
