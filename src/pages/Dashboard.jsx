import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/core/dashboard/Sidebar";
import { FiMenu } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full max-[768px]:flex-col flex bg-gray-100 h-screen">
      <div className="flex w-full justify-between items-center p-5 bg-white shadow-md md:hidden">
        <img src="/logo.png" alt="logo" className="h-7" />
        <div onClick={() => setIsSidebarOpen(prev => !prev)} className="cursor-pointer">
          {isSidebarOpen
            ? <IoClose className="text-2xl ease-in-out transition-all duration-300 focus:rotate-90" />
            : <FiMenu className="text-2xl" />
          }
        </div>
      </div>
      <div>
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div onClick={() => setIsSidebarOpen(false)} className="flex-1 w-full h-screen overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default Dashboard;
