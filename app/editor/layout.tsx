import { getServerSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import EditorPage from "./page";

export default async function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(cookies());

  if (!["ADMIN", "MODDER"].includes(session.role)) {
    redirect("/");
  }

  return (
    <div className="px-4 xl:px-32 m-auto">
      <EditorPage session={session} />
    </div>
  );
}
