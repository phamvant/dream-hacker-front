import HighlightArea from "@/app/components/HighlightArea";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-3 gap-10 pt-10">
      <div className="relative col-span-2 rounded-lg">{children}</div>
      <div className="relative col-span-1">
        <HighlightArea />
      </div>
    </div>
  );
}
