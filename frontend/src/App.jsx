import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/Admin/pages/AddProduct";
import AdminLogin from "./Pages/Admin/pages/AdminLogin";
import ProtectedAdminRoute from "./Pages/Admin/Components/AdminProtectedRoute";
import AdminDashboard from "./Pages/Admin/pages/AdminDashboard";
import AdminLayout from "./Pages/Admin/pages/AdminLayout";
import ManageProducts from "./Pages/Admin/pages/ManageProducts";
// User Pages
import UserLayout from "./Pages/User/UserLayout";
import HomePage from "./Pages/User/HomePage";
import NotFound from "./Pages/User/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* Admin Acess Only */}
        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
