import NavigationBar from "@/components/NavigationBar";
import { getServerSession } from "@/lib/auth/auth";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getServerSession(cookies());
  return (
    <div className="max-w-3xl xl:max-w-7xl px-4 m-auto min-h-screen">
      <NavigationBar session={session} />
      {children}
      <div className="h-52 w-full"></div>
    </div>
  );
}
