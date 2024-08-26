import ProfileButton from "./ProfileButton";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { menuItems } from "@/app/(main)/list/category";

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
                  >
                    <p className="hover:scale-110 transition-all">
                      {item.name}
                    </p>
                  </a>
                  {item.sub ? (
                    <div className="absolute right-0 hidden group-hover:block w-96 pt-8">
                      <div className="grid grid-cols-2 border-2 gap-4 p-4 transition-opacity rounded-xl bg-primary-foreground">
                        {item.sub?.map((cate) => (
                          <Link
                            key={cate.id}
                            href={`list?category=${cate.id}&page=1`}
                            className="hover:text-slate-700 hover:dark:text-slate-100 hover:scale-105 transition-all"
                          >
                            {cate.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          }
        })}
        {session ? (
          <div className="">
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
