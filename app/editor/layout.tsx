import { getServerSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { role } = await getServerSession(cookies());

  if (!["ADMIN", "MODDER"].includes(role)) {
    redirect("/");
  }

  return <div className="px-4 xl:px-32 m-auto">{children}</div>;
}
