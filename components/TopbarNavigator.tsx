import ProfileButton from "./ProfileButton";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MenuItem {
  name: string;
  href: string;
  authRequire?: boolean;
  openInNewTab?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "MBA", href: "/mba" },
  { name: "PhD", href: "/phd" },
  { name: "Editor", href: "/editor", authRequire: true },
];

export default function TopbarNavigator({
  isAuth,
  isFetching,
}: {
  isAuth: any;
  isFetching: boolean;
}) {
  return !isFetching ? (
    <nav>
      <div className="hidden xl:flex items-center">
        {menuItems.map((item) => {
          if (!item.authRequire || (item.authRequire && isAuth)) {
            return (
              <div key={item.href} className="ml-4 md:ml-8 text-blue-700/80">
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
        {isAuth ? (
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
