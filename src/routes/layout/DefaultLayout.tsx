import Header from "@/components/commons/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <main className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:pl-72 pt-20 pb-10 px-8 lg:w-full">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}
