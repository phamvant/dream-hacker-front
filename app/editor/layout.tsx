import configuration from "../config/configuration";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getSession = async () => {
  try {
    const res = await fetch(`${configuration.APP.BACKEND_URL}/auth`, {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
      headers: { Cookie: cookies().toString() },
    });

    if (!res.ok) {
      return false;
    }

    return res;
  } catch (err) {
    return false;
  }
};

export default async function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await getSession();

  if (!isAuth) {
    redirect("/");
  }

  return <div className="px-4 xl:px-32 m-auto">{children}</div>;
}
