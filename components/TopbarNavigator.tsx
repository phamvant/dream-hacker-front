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
  { name: "MBA", href: "/list?category=1&page=1" },
  { name: "PhD", href: "/list?category=2&page=1" },
  { name: "Editor", href: "/editor", role: "ADMIN" },
];

export default function TopbarNavigator({
  session,
  className,
}: {
  session: any;
  className: string;
}) {
  return (
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
            <ProfileButton session={session} />
          </div>
        ) : (
          <Button className="rounded-full ml-4 md:ml-8" variant={"default"}>
            <a href="/login">Login</a>
          </Button>
        )}
      </div>
    </nav>
  );
}
