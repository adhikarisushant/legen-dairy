import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user->", typeof user);
  return (
    <div>
      <div className="flex min-h-[100vh]">
        <div className="1500px:w-[16%] w-1/5">
          <Sidebar />
        </div>
        <div className="w-[85%]">
          <Header />
          <div className="mt-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
