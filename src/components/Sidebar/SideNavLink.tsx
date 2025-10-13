import { NavLink } from "react-router";
import clsx from "clsx";
import useUiStore from "@/store/useUiStore";

interface SideNavLinkProps {
  category: string;
  items: { label: string; to: string }[];
}

export default function SideNavLink({ category, items }: SideNavLinkProps) {
  const navActiveStyle = ({ isActive }: { isActive: boolean }) => {
    return clsx(
      "block w-full rounded-md px-4 py-2 text-sm text-blue-400",
      isActive && "bg-blue-200 font-semibold text-blue-700",
      !isActive && "hover:bg-blue-200 text-blue-500"
    );
  };

  const closeSidebar = useUiStore((s) => s.closeSidebar);

  return (
    <div key={category} className="mb-6">
      <h2 className="px-2 mb-2 text-sm font-semibold text-blue-600 uppercase">
        {category}
      </h2>
      <ul className="flex flex-col gap-1">
        {items.map(({ label, to }) => (
          <li key={to}>
            <NavLink to={to} className={navActiveStyle} onClick={closeSidebar}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
