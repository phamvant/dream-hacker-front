import Link from "next/link";
import { cn } from "../lib/utils";

interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}
const menuItems: MenuItem[] = [
  { name: "MBA", href: "/mba" },
  { name: "PhD", href: "/phd" },
];

export const Topbar = () => {
  // const pathname = usePathname();

  return (
    <section className="flex items-center justify-between pt-8 md:pt-16 mb-12">
      <Link href="/">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-blue-700/80">
          Dreamhacker.
        </h1>
      </Link>
      <nav>
        <div className="hidden md:flex items-center">
          {menuItems.map((item) => (
            <div key={item.href} className="ml-4 md:ml-8 text-blue-700/80">
              <a
                href={item.href}
                target={item.openInNewTab ? "_blank" : "_self"}
                className={cn("hover:text-gray-900")}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      </nav>
    </section>
  );
};
