import useUiStore from "@/store/useUiStore";
import { NavLink } from "react-router";
import { MenuIcon } from "lucide-react";
import Button from "./Button";

export default function Header() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="fixed inset-0 h-16 bg-white shadow z-40">
      <nav className="flex gap-4 items-center h-full px-4">
        <NavLink to="/" className="text-lg text-blue-400">
          React-Component-Collection
        </NavLink>

        <Button
          variant="icon"
          className="lg:hidden ml-auto cursor-pointer hover:bg-gray-100 p-2 rounded-full"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </Button>
      </nav>
    </header>
  );
}
