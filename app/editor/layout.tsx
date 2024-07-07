import EditorTopbar from "@/components/EditorTopBar";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="px-4 xl:px-32 m-auto">{children}</div>;
}
