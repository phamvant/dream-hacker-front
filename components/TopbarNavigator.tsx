import ProfileButton from "./ProfileButton";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

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
      <div className={cn(className, "items-center gap-4 md:gap-10")}>
        <ModeToggle />
        {menuItems.map((item) => {
          if (!item.role || item.role === session.role) {
            return (
              <div
                key={item.href}
                className="text-blue-700/80 dark:text-blue-500 relative group mx-auto"
              >
                <div>
                  <a
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : "_self"}
                    className={cn("hover:text-gray-900")}
                  >
                    {item.name}
                  </a>
                  <div className="absolute right-0 hidden group-hover:block w-96 pt-8">
                    <div className="grid grid-cols-2 border-2 gap-4 p-4 transition-opacity rounded-xl bg-primary-foreground">
                      <Link href={"#"}>Essay Writing</Link>
                      <Link href={"#"}>MBA Rankings</Link>
                      <Link href={"#"}>MBA Interviews</Link>
                      <Link href={"#"}>School Information</Link>
                      <Link href={"#"}>Resume</Link>
                      <Link href={"#"}>Letter</Link>
                      <Link href={"#"}>Application FAQ</Link>
                      <Link href={"#"}>Application Summary</Link>
                      <Link href={"#"}>Application Strategy</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
        {session ? (
          <div className="ml-4 md:ml-8">
            <ProfileButton session={session} />
          </div>
        ) : (
          <Button className="rounded-full" variant={"default"}>
            <a href="/login">Login</a>
          </Button>
        )}
      </div>
    </nav>
  );
}
