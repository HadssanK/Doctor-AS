import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DoctorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <div className="md:w-60">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:ml-0 mt-16 md:mt-0 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
