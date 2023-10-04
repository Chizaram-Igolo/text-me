import { ReactElement } from "react";

import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
