import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import styles from "./CSS/UserLayout.module.css";

const UserLayout = () => {
  return (
    <div className={styles.userLayout}>
      <Header />

      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
