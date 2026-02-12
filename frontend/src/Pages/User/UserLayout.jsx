import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserLayout;
