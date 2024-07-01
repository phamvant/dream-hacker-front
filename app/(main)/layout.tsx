import HighlightArea from "@/app/components/HighlightArea";
import { Topbar } from "@/app/components/Topbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-3 h-[100%] gap-10 pt-10">
      <div className="relative col-span-2 h-[100%] rounded-lg">{children}</div>
      <div className="relative col-span-1 h-[50%] border-2 rounded-xl border-gray-100">
        <HighlightArea />
      </div>
    </div>
  );
}
