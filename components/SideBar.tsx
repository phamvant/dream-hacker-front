import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { menuItems, MenuItem } from "./TopbarNavigator";
import { ModeToggle } from "./ModeToggle";

export default function SideBar({
  className,
  isShow,
  onClickShowSidebar,
  session,
  isFetching,
}: {
  className?: string;
  isShow: boolean;
  onClickShowSidebar: Dispatch<SetStateAction<boolean>>;
  session: any;
  isFetching: boolean;
}) {
  return (
    <div
      className={cn(
        `${isShow ? "-translate-x-0" : "-translate-x-full"}`,
        className,
        `px-6 transition-all duration-300  transform fixed top-0 start-0 bottom-0
        z-[60] w-2/3 bg-white border-e border-gray-200 pt-7 pb-10 backdrop-filter backdrop-blur-xl dark:bg-black/50 bg-white/50 dark:border-neutral-700`
      )}
    >
      <div className="relative">
        <div className="flex justify-between items-center pb-10">
          <a
            className="flex-none text-2xl font-semibold text-blue-700/80 dark:text-blue-500"
            href="#"
            aria-label="Brand"
          >
            Dreamhacker.
          </a>
          <ChevronsLeft
            className="text-blue-700/80 dark:text-blue-500"
            onClick={() => onClickShowSidebar((prevState) => !prevState)}
          />
        </div>
        <nav className="w-full flex flex-col flex-wrap ">
          <ul className="space-y-4">
            {menuItems.map((item: MenuItem) => {
              if (!item.role || session.role === item.role) {
                return (
                  <li key={item.href}>
                    <a href={item.href}>{item.name}</a>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-10">
        <ModeToggle />
      </div>
    </div>
  );
}
