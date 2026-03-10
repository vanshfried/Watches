import { Outlet } from "react-router-dom";
import AdminHeader from "../Components/AdminHeader";
import styles from "../CSS/AdminLayout.module.css";

function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <AdminHeader />

      <main className={styles.adminContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
