import { ReactNode } from "react";
import { cookies } from "next/headers";
import { getServerSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function LoginPageLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession(cookies());

  if (session) {
    redirect("/");
  }

  return <div className="max-w-3xl xl:max-w-7xl px-4 m-auto">{children}</div>;
}
