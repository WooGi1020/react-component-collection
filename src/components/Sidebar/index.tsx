import { motion, AnimatePresence } from "motion/react";
import useUiStore from "@/store/useUiStore";
import { SidebarClose } from "lucide-react";
import MENU from "@/constants/menus.config";
import SideNavLink from "./SideNavLink";
import Button from "../Button";

export default function Sidebar() {
  const isOpen = useUiStore((s) => s.isSidebarOpen);
  const closeSidebar = useUiStore((s) => s.closeSidebar);

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64  pt-20 shadow-md px-3">
        <nav className="w-full overflow-y-auto px-3">
          {MENU.map(({ category, items }) => (
            <SideNavLink key={category} category={category} items={items} />
          ))}
        </nav>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 lg:hidden z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
            <motion.aside
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg lg:hidden pt-24 px-3 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
            >
              <Button
                variant="icon"
                onClick={closeSidebar}
                className="absolute top-17 right-2"
              >
                <SidebarClose />
              </Button>
              <nav className="w-full overflow-y-auto">
                {MENU.map(({ category, items }) => (
                  <SideNavLink
                    key={category}
                    category={category}
                    items={items}
                  />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
