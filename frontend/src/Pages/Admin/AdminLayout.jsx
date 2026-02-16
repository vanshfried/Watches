import { Outlet } from "react-router-dom";
import AdminHeader from "./Components/AdminHeader";

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
