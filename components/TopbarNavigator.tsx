import ProfileButton from "./ProfileButton";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export interface MenuItem {
  name: string;
  href: string;
  role?: string;
  openInNewTab?: boolean;
}

export const menuItems: MenuItem[] = [
  { name: "MBA", href: "/mba" },
  { name: "PhD", href: "/phd" },
  { name: "Editor", href: "/editor", role: "ADMIN" },
];

export default function TopbarNavigator({
  session,
  isFetching,
  className,
}: {
  session: any;
  isFetching: boolean;
  className: string;
}) {
  return !isFetching ? (
    <nav>
      <div className={cn(className, "items-center")}>
        <ModeToggle />
        {menuItems.map((item) => {
          if (!item.role || item.role === session.role) {
            return (
              <div
                key={item.href}
                className="ml-4 md:ml-8 text-blue-700/80 dark:text-blue-500"
              >
                <a
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : "_self"}
                  className={cn("hover:text-gray-900")}
                >
                  {item.name}
                </a>
              </div>
            );
          }
        })}
        {session ? (
          <div className="ml-4 md:ml-8">
            <ProfileButton />
          </div>
        ) : (
          <Button className="rounded-full ml-4 md:ml-8" variant={"default"}>
            <a href="/login">Login</a>
          </Button>
        )}
      </div>
    </nav>
  ) : null;
}
