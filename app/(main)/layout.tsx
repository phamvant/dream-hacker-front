import NavigationBar from "@/components/NavigationBar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-3xl xl:max-w-7xl px-4 m-auto min-h-screen">
      <NavigationBar />
      {children}
      <div className="h-52 w-full"></div>
    </div>
  );
}
