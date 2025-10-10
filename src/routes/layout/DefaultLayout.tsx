import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <main className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-72 py-20 px-8 lg:w-full mx-auto">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}
