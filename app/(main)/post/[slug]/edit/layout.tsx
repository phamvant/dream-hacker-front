import EditorTopbar from "@/components/EditorTopBar";
import { getServerSession } from "@/lib/auth/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(cookies());

  if (session && !["ADMIN", "MODDER"].includes(session.role)) {
    redirect("/");
  }

  return (
    <div className="px-4 xl:px-32 m-auto">
      <EditorTopbar session={session} />
      {children}
    </div>
  );
}
