import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user->", typeof user);
  return (
    <div>
      <h1>Sidebar</h1>
      <h2>Navbar</h2>
      <h3>{JSON.stringify(user)}</h3>
      <Outlet />
    </div>
  );
};

export default Layout;
