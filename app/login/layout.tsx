import { ReactNode } from "react";

export default async function LoginPageLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="max-w-3xl xl:max-w-7xl px-4 m-auto">{children}</div>;
}
