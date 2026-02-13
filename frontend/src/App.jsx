import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/Admin/AddProduct";
import AdminLogin from "./Pages/Admin/AdminLogin";
import ProtectedAdminRoute from "./Pages/Admin/Components/AdminProtectedRoute";
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

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Admin Acess Only */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
