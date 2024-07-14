"use client";

import HighlightArea from "@/components/HighlightArea";
import SideBar from "@/components/SideBar";
import Topbar from "@/components/Topbar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isShowSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="max-w-3xl xl:max-w-7xl px-4 m-auto min-h-screen">
      <SideBar isShow={isShowSidebar} onClickShowSidebar={setShowSidebar} />
      <Topbar onClickShowSidebar={setShowSidebar} />
      <div className={cn(`grid grid-cols-3 gap-10 pt-24 md:pt-10`)}>
        <div className="relative col-span-3 xl:col-span-2 rounded-lg">
          {children}
        </div>
        <div className="relative hidden xl:block md:col-span-1">
          <HighlightArea />
        </div>
      </div>
    </div>
  );
}
