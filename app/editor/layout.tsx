import { getServerSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await getServerSession(cookies());

  if (!isAuth) {
    redirect("/");
  }

  return <div className="px-4 xl:px-32 m-auto">{children}</div>;
}
